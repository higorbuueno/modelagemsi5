import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativando CORS para fazer requisições pelo front-end
  app.enableCors();

  // Startando aplicação na porta 3000
  await app.listen(3000);
}
bootstrap();
