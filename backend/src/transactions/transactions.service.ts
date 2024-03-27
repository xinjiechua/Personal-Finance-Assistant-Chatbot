import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as csvParser from 'csv-parser'; // Import csv-parser
import { Transaction } from '@prisma/client';

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
        userId: transactionData.userId,
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
    
    async getAll(userId: number): Promise<Transaction[]> {
        return this.prismaService.transaction.findMany({ where: { userId: userId } });
    }
}
