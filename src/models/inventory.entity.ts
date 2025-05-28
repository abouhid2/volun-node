import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Entity as EntityModel } from './entity.entity';
import { InventoryTransaction } from './inventory-transaction.entity';

@Entity({ name: 'inventories' })
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity_id: number;

  @Column()
  item_name: string;

  @Column()
  item_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => EntityModel, entity => entity.inventories)
  @JoinColumn({ name: 'entity_id' })
  entity: EntityModel;

  @OneToMany(() => InventoryTransaction, transaction => transaction.inventory)
  transactions: InventoryTransaction[];
} 