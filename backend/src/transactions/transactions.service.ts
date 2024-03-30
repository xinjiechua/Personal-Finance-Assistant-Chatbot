import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as csvParser from 'csv-parser'; // Import csv-parser
import { transaction } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async processCsv(csvData: string) {
    const parsedData = await this.parseCsvData(csvData);
    // Insert parsed data into PostgreSQL using Prisma
    await this.prismaService.transaction.createMany({
      data: parsedData,
    });
    return 'CSV data processed and inserted into database.';
  }

  private async parseCsvData(csvData: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      csvParser({ headers: true })
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  async insertTransaction(transactionData: {
    id: string;
    date: Date;
    transaction_details: string;
    description: string;
    category: string;
    payment_method: string;
    withdrawal_amount: number;
    deposit_amount: number;
    userId: number;
  }) {
    return this.prismaService.transaction.create({
      data: {
        id: transactionData.id,
        userid: transactionData.userId,
        date: transactionData.date,
        transaction_details: transactionData.transaction_details,
        description: transactionData.description,
        category: transactionData.category,
        payment_method: transactionData.payment_method,
        withdrawal_amt: transactionData.withdrawal_amount,
        deposit_amt: transactionData.deposit_amount,
      },
    });
  }

  async getAll(userId: number): Promise<transaction[]> {
    return this.prismaService.transaction.findMany({
      where: { userid: userId },
    });
  }

  async getAllExpensesByCategory(
    userId: number,
  ): Promise<{ category: string; totalAmount: number }[]> {
    const expensesByCategory = await this.prismaService.transaction.groupBy({
      by: ['category'],
      where: {
        userid: userId,
        withdrawal_amt: {
          not: 0, // Filter out transactions where withdrawal_amt is not null
        },
      },
      _sum: {
        withdrawal_amt: true, // Summing up withdrawal amounts for each category
      },
    });

    // Format the response to match the desired shape
    const formattedExpenses = expensesByCategory.map((expense) => ({
      category: expense.category,
      totalAmount: expense._sum.withdrawal_amt,
    }));

    // Sort the formattedExpenses array by totalAmount in descending order
    formattedExpenses.sort((a, b) => b.totalAmount - a.totalAmount);

    return formattedExpenses;
  }

  async getTotalExpensesAndIncomeByWeek(userId: number): Promise<any> {
    try {
      const transactions = await this.prismaService.transaction.findMany({
        select: {
          date: true,
          withdrawal_amt: true,
          deposit_amt: true,
        },
        where: { userid: userId },
        orderBy: { date: 'asc' }, // Sort transactions by date in ascending order
      });

      const expensesAndIncomeByWeek: any = {};

      transactions.forEach((transaction) => {
        const date = new Date(transaction.date);
        const weekNumber = this.getWeekNumber(date);
        const year = date.getFullYear();

        const key = `${year}-W${weekNumber}`;

        if (!expensesAndIncomeByWeek[key]) {
          expensesAndIncomeByWeek[key] = {
            totalExpenses: 0,
            totalIncome: 0,
          };
        }

        expensesAndIncomeByWeek[key].totalExpenses +=
          transaction.withdrawal_amt || 0;
        expensesAndIncomeByWeek[key].totalIncome +=
          transaction.deposit_amt || 0;
      });

      return expensesAndIncomeByWeek;
    } catch (error) {
      throw new Error(`Error fetching transactions: ${error}`);
    }
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  async getUserFinancialSummary(userId: number) {
    try {
      const userTransactions = await this.prismaService.transaction.findMany({
        where: {
          userid: userId,
        },
      });

      // Calculate total amount
      const totalAmount = userTransactions.reduce(
        (total, transaction) => total + (transaction.deposit_amt || 0),
        0,
      );

      // Calculate total expenses
      const totalExpenses = userTransactions.reduce(
        (total, transaction) => total + (transaction.withdrawal_amt || 0),
        0,
      );

      // Calculate total balance
      const totalBalance = totalAmount - totalExpenses;

      return {
        totalBalance,
        totalAmount,
        totalExpenses,
      };
    } catch (error) {
      throw new Error(`Error fetching user financial summary: ${error}`);
    } finally {
      await this.prismaService.$disconnect();
    }
  }
}
