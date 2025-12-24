import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '../constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(PAYMENT_CLIENT) private readonly paymentRMQClient:ClientProxy,
    @Inject(NOTIFICATION_CLIENT) private readonly notificationRMQClient:ClientProxy
  ) {}


  @EventPattern('order-created')
 async handleOrderCreated(@Payload() order:any){
    console.log('[ORDER SERVICE] RUNNING...', order)
    await this.appService.saveOrder(order)
    this.paymentRMQClient.emit('process-payment',order)
    this.notificationRMQClient.emit('order-created',order)
  }

}
