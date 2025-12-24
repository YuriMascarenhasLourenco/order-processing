import { Body, Controller, Inject, Post, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE_RABBITMQ } from '../constant';
@Controller()
export class AppController {
  constructor( @Inject(ORDER_SERVICE_RABBITMQ) private readonly client: ClientProxy
  ) {}
  @Post('order')
  async createorder(@Body() order: any) {
    
    this.client.emit("order-created", order);
    return { message: 'order sent to RabbitMQ' }
  }

}
