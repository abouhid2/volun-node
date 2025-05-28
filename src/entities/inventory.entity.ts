import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, Unique } from 'typeorm';
import { Entity as EntityModel } from './entity.entity';
import { InventoryTransaction } from './inventory-transaction.entity';

@Entity('inventories')
@Unique('idx_inventory_unique_items', ['entity_id', 'item_type', 'item_name', 'unit'])
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EntityModel, entity => entity.inventories)
  @JoinColumn({ name: 'entity_id' })
  entity: EntityModel;

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

  @OneToMany(() => InventoryTransaction, transaction => transaction.inventory)
  inventory_transactions: InventoryTransaction[];
} 