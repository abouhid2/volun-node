import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Entity as EntityModel } from './entity.entity';

@Entity({ name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity_id: number;

  @Column()
  item_name: string;

  @Column()
  item_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1 })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ default: false })
  fulfilled: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fulfilled_at: Date;

  @Column({ nullable: true })
  requested_by: string;

  @Column({ type: 'timestamp', nullable: true })
  requested_at: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => EntityModel, entity => entity.requests)
  @JoinColumn({ name: 'entity_id' })
  entity: EntityModel;
} 