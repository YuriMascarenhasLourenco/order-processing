import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport:Transport.RMQ,
      options:{
        urls:['amqp://guest:guest@localhost:5672'],
        queue: 'notification-queue',
        queueOptions:{
          durable:true
        }
      }
    },
  );
  await app.listen();
  Logger.log(
    `🚀 Application is running on RabbitMQ: `
  );
}

bootstrap();
