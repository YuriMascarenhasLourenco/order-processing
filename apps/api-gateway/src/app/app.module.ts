import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule } from '@nestjs/config';
import { ORDER_QUEUE, ORDER_SERVICE_RABBITMQ } from '../constant';
import path from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [
      path.resolve(process.cwd(), '.env'), // projeto raiz
      path.resolve(process.cwd(), 'apps/api-gateway/.env'), // env específico do serviço
    ],
    isGlobal: true
  }), ClientsModule.register([{
    name: ORDER_SERVICE_RABBITMQ,
    transport: Transport.RMQ,
    options:{
      urls:["amqp://guest:guest@localhost:5672"],
      queue: ORDER_QUEUE
    }
  }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
