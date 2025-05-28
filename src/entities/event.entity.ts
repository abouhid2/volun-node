import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Entity as EntityModel } from './entity.entity';
import { Participant } from './participant.entity';
import { Car } from './car.entity';
import { Donation } from './donation.entity';
import { DonationSetting } from './donation-setting.entity';
import { Comment } from './comment.entity';
import { InventoryTransaction } from './inventory-transaction.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @Column({ type: 'time', nullable: true })
  time: Date;

  @Column({ nullable: true })
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => EntityModel, entity => entity.events)
  @JoinColumn({ name: 'entity_id' })
  entity: EntityModel;

  @Column({ nullable: true })
  entity_id: number;

  @ManyToOne(() => User, user => user.events)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  user_id: number;

  @OneToMany(() => Participant, participant => participant.event)
  participants: Participant[];

  @OneToMany(() => Car, car => car.event)
  cars: Car[];

  @OneToMany(() => Donation, donation => donation.event)
  donations: Donation[];

  @OneToMany(() => Comment, comment => comment.event)
  comments: Comment[];

  @OneToMany(() => InventoryTransaction, transaction => transaction.event)
  inventory_transactions: InventoryTransaction[];

  @OneToMany(() => DonationSetting, donationSetting => donationSetting.event)
  donation_settings: DonationSetting[];
} 