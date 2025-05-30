import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  const configService = app.get(ConfigService);
  const frontendUrl = configService.get('FRONTEND_URL') || '*';
  
  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
    
  const port = process.env.port || 8080;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Accepting CORS requests from: ${frontendUrl}`);
}

bootstrap(); 