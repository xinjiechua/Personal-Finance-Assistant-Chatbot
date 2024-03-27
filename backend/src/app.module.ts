import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsModule } from './transactions/transactions.module';
import { PrismaService } from './prisma.service';


@Module({
  imports: [UsersModule, TransactionsModule],
  controllers: [AppController, TransactionsController],
  providers: [AppService, TransactionsService, PrismaService, UsersService],
})
export class AppModule {}
