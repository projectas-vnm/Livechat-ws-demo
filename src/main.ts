import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalWsExceptionFilter } from './libs/exceptions/global.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new GlobalWsExceptionFilter());

  await app.listen(3000);
}
bootstrap();
