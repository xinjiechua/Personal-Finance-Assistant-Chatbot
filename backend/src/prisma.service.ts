import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma client connected to SQLite database.');
    } catch (error) {
      this.logger.error(`Error connecting to database: ${error}`);
      throw error; // Rethrow the error to halt application startup if database connection fails
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma client disconnected.');
  }
}
