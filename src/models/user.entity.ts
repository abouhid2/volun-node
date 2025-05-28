import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { Event } from './event.entity';
import { Comment } from './comment.entity';
import { Donation } from './donation.entity';
import { Entity as EntityModel } from './entity.entity';
import { Participant } from './participant.entity';
import { InventoryTransaction } from './inventory-transaction.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_digest: string;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Event, event => event.user)
  events: Event[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Donation, donation => donation.user)
  donations: Donation[];

  @OneToMany(() => EntityModel, entity => entity.user)
  entities: EntityModel[];

  @OneToMany(() => Participant, participant => participant.user)
  participations: Participant[];

  @OneToMany(() => InventoryTransaction, transaction => transaction.user)
  inventory_transactions: InventoryTransaction[];
} 