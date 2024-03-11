import { Module } from '@nestjs/common';
import { LoggerModule as PinoLogger } from 'nestjs-pino';
@Module({
  imports: [PinoLogger.forRoot({
    pinoHttp: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: true
        }
      }
    }
  })],
})
export class LoggerModule { }
