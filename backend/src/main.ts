import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  Logger.log(
    `Application is running on: |> http://localhost:${process.env.PORT ?? 3000}/ <|`,
  );
  // Logger.error('This is a sample error message for demonstration purposes.');
  // Logger.debug('This is a sample debug message for demonstration purposes.');
  // Logger.fatal('This is a sample fatal message for demonstration purposes.');
  // Logger.verbose('This is a sample verbose message for demonstration purposes.');
  // Logger.warn('This is a sample warn message for demonstration purposes.');
}
bootstrap();
