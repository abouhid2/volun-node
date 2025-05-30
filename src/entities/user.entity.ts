import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { Entity as EntityModel } from './entity.entity';
import { Event } from './event.entity';
import { Participant } from './participant.entity';
import { Donation } from './donation.entity';
import { Comment } from './comment.entity';
import { InventoryTransaction } from './inventory-transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password_digest: string;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => EntityModel, entity => entity.user)
  entities: EntityModel[];

  @OneToMany(() => Event, event => event.user)
  events: Event[];

  @OneToMany(() => Participant, participant => participant.user)
  participants: Participant[];

  @OneToMany(() => Donation, donation => donation.user)
  donations: Donation[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => InventoryTransaction, transaction => transaction.user)
  inventory_transactions: InventoryTransaction[];
} 