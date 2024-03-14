import { LoggerModule, NOTIFICATIONS_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NOTIFICATIONS_HOST: Joi.string().required(),
        NOTIFICATIONS_PORT: Joi.number().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      })
    }),
    // ClientsModule.registerAsync([
    //   {
    //     name: NOTIFICATIONS_SERVICE,
    //     useFactory: (configService: ConfigService) => ({
    //       transport: Transport.TCP,
    //       options: {
    //         host: configService.get('NOTIFICATIONS_HOST'),
    //         port: configService.get('NOTIFICATIONS_PORT'),
    //       },
    //     }),
    //     inject: [ConfigService],
    //   },
    // ]),
    LoggerModule
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule { }
