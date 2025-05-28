import { Entity as TypeOrmEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';
import { Inventory } from './inventory.entity';
import { Request } from './request.entity';

@TypeOrmEntity({ name: 'entities' })
export class Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, user => user.entities)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  user_id: number;

  @OneToMany(() => Event, event => event.entity)
  events: Event[];

  @OneToMany(() => Inventory, inventory => inventory.entity)
  inventories: Inventory[];

  @OneToMany(() => Request, request => request.entity)
  requests: Request[];
} 