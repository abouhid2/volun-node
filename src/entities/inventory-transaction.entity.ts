import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';
import { Inventory } from './inventory.entity';
import { Donation } from './donation.entity';

@Entity('inventory_transactions')
@Index('index_inventory_transactions_on_transaction_type', ['transaction_type'])
export class InventoryTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inventory, inventory => inventory.inventory_transactions)
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;

  @Column()
  inventory_id: number;

  @ManyToOne(() => Event, event => event.inventory_transactions, { nullable: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ nullable: true })
  event_id: number;

  @ManyToOne(() => Donation, donation => donation.inventory_transactions, { nullable: true })
  @JoinColumn({ name: 'donation_id' })
  donation: Donation;

  @Column({ nullable: true })
  donation_id: number;

  @ManyToOne(() => User, user => user.inventory_transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
} 