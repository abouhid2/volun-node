import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Inventory } from './inventory.entity';
import { Event } from './event.entity';
import { Donation } from './donation.entity';
import { User } from './user.entity';

@Entity({ name: 'inventory_transactions' })
export class InventoryTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inventory_id: number;

  @Column({ nullable: true })
  event_id: number;

  @Column({ nullable: true })
  donation_id: number;

  @Column()
  user_id: number;

  @Column()
  transaction_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Inventory, inventory => inventory.transactions)
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;

  @ManyToOne(() => Event, event => event.inventory_transactions)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => Donation, donation => donation.inventory_transactions)
  @JoinColumn({ name: 'donation_id' })
  donation: Donation;

  @ManyToOne(() => User, user => user.inventory_transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;
} 