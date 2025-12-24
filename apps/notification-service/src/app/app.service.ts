import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async sendOrderEmail(order: any) {}
  async sendPaymentEmail(order: any){}
}
