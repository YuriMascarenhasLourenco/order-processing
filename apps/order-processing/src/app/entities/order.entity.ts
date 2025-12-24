import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('order_status_history')
export class OrderStatusHistoryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orderId!: string;

  @Column()
  oldStatus!: string;

  @Column()
  newStatus!: string;

  @CreateDateColumn()
  changedAt!: Date;
}