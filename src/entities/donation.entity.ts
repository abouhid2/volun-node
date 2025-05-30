import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';
import { Car } from './car.entity';
import { InventoryTransaction } from './inventory-transaction.entity';

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.donations)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  event_id: number;

  @ManyToOne(() => User, user => user.donations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(() => Car, car => car.donations, { nullable: true })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ nullable: true })
  car_id: number;

  @Column({ name: 'donation_type' })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => InventoryTransaction, transaction => transaction.donation)
  inventory_transactions: InventoryTransaction[];
} 