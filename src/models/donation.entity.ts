import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';
import { Car } from './car.entity';
import { InventoryTransaction } from './inventory-transaction.entity';

@Entity({ name: 'donations' })
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  car_id: number;

  @Column({ name: 'donation_type' })
  donation_type: string;

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

  @ManyToOne(() => Event, event => event.donations)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => User, user => user.donations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Car, car => car.donations)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @OneToMany(() => InventoryTransaction, transaction => transaction.donation)
  inventory_transactions: InventoryTransaction[];
} 