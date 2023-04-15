import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3070);
  console.log(`listening port ${process.env.PORT || '3070'}`);
}
bootstrap();
