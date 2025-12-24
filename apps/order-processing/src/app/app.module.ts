import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '../constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusHistoryOrmEntity } from './entities/order.entity';
import path from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [
      path.resolve(process.cwd(), '.env'),
      path.resolve(process.cwd(), 'apps/order-processing/.env')
    ],
    isGlobal: true
  }), ClientsModule.registerAsync([{
    name: PAYMENT_CLIENT,
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'payment-queue',
        queueOptions: {
          durable: true,
        }
      }
    }),

  }]),
  ClientsModule.registerAsync([{
    name: NOTIFICATION_CLIENT,
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'notification-queue',
        queueOptions: {
          durable: true,
        }
      }
    }),

  }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
