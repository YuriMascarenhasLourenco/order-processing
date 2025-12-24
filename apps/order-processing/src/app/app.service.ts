import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatusHistoryOrmEntity } from './entities/order.entity';

@Injectable()
export class AppService {
  constructor(){}
  async saveOrder(order:any){
  }
  
}
