import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';


@Module({
  
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, UsersService],
})
export class TransactionsModule {}
