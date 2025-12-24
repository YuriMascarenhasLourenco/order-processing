import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NOTIFICATION_CLIENT } from '../constant';
import path from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'apps/payment-service/.env')],
    isGlobal: true
  }), ClientsModule.registerAsync([{
    name: NOTIFICATION_CLIENT,
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: [config.getOrThrow<string>('RABBITMQ_URL')],
        queue: 'notification-queue',
        queueOptions: {
          durable: true,
        }
      }
    }),

  }]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
