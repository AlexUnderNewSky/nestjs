import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// загрузить .env и развернуть ${VAR} в других переменных
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

import { env, PrismaConfig } from 'prisma/config';

export default {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
} satisfies PrismaConfig;