import { UsersService } from './../users/users.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly usersService: UsersService,
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file) {
    return await this.transactionService.processCsv(file.buffer.toString());
  }

  @Post('insert/:userId')
  async insertNewTransaction(
    @Param('userId', ParseIntPipe) userId: number,
    @Body()
    transactionData: {
      id: string;
      date: Date;
      transaction_details: string;
      description: string;
      category: string;
      payment_method: string;
      withdrawal_amount: number;
      deposit_amount: number;
    },
  ) {
    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`User Not Found`);
    }
    return this.transactionService.insertTransaction({ userId, ...transactionData });
  }


  @Get(':userId')
  async getAllTransactions(@Param('userId', ParseIntPipe) userId) {
    return this.transactionService.getAll(userId);
  }
  
  @Get(':userId/category')
  async getAllTransactionsCategory(@Param('userId', ParseIntPipe) userId) {
    return this.transactionService.getAllExpensesByCategory(userId);
  }

  @Get(':userId/line')
  async getIncomeExpensesByMonth(@Param('userId', ParseIntPipe) userId) {
    return this.transactionService.getTotalExpensesAndIncomeByWeek(userId);
  }

  @Get(':userId/balance')
  async getUserFinancialSummary(@Param('userId', ParseIntPipe) userId) {
    return this.transactionService.getUserFinancialSummary(userId);
  }

  @Get(':userId/:year/:month')
  async getTransactionsByMonth(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.transactionService.getTransactionsByMonth(userId, year, month);
  }



}

