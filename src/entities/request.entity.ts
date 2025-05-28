import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Entity as EntityModel } from './entity.entity';

@Entity('requests')
@Index('index_requests_on_fulfilled', ['fulfilled'])
@Index('index_requests_on_item_type', ['item_type'])
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EntityModel, entity => entity.requests)
  @JoinColumn({ name: 'entity_id' })
  entity: EntityModel;

  @Column()
  entity_id: number;

  @Column({ nullable: true })
  item_name: string;

  @Column({ nullable: true })
  item_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1.0, nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ default: false })
  fulfilled: boolean;

  @Column({ nullable: true })
  fulfilled_at: Date;

  @Column({ nullable: true })
  requested_by: string;

  @Column({ nullable: true })
  requested_at: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 