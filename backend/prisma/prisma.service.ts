import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      // direct DB adapter (Prisma 7)
      adapter: {
        provider: 'postgresql',
        url: process.env.DATABASE_URL,
      },
      // accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}