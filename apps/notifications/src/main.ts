import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Logger } from "nestjs-pino";
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT'),
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
