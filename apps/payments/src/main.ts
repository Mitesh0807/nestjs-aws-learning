import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(PaymentsModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT'),
    },
  });
  await app.listen(configService.get('PORT'));
  app.useLogger(app.get(Logger));
}
bootstrap();
