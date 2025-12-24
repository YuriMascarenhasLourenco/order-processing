import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  ) {}
  @EventPattern('order-created')
  async handleOrderCreatedEmail(@Payload() order:any){
    await this.appService.sendOrderEmail(order)
    console.log('[Notification Service] Sending Order Created Email', order)
  }

  @EventPattern('payment-succeed')
  async handlePaymentSuceedEmail(@Payload() order:any){
    await this.appService.sendPaymentEmail(order)
      console.log('[Notification Service] Sending Order Created Email', order)
  }
}
