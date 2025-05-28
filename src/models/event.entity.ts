import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Entity as EntityModel } from './entity.entity';
import { User } from './user.entity';
import { Car } from './car.entity';
import { Comment } from './comment.entity';
import { Donation } from './donation.entity';
import { Participant } from './participant.entity';
import { DonationSetting } from './donation-setting.entity';
import { InventoryTransaction } from './inventory-transaction.entity';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'timestamp', nullable: true })
  time: Date;

  @Column()
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ nullable: true })
  entity_id: number;

  @ManyToOne(() => EntityModel, entity => entity.events)
  @JoinColumn({ name: 'entity_id' })
  entity: EntityModel;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, user => user.events)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Car, car => car.event)
  cars: Car[];

  @OneToMany(() => Comment, comment => comment.event)
  comments: Comment[];

  @OneToMany(() => Donation, donation => donation.event)
  donations: Donation[];

  @OneToMany(() => Participant, participant => participant.event)
  participants: Participant[];

  @OneToMany(() => DonationSetting, donationSetting => donationSetting.event)
  donation_settings: DonationSetting[];

  @OneToMany(() => InventoryTransaction, transaction => transaction.event)
  inventory_transactions: InventoryTransaction[];
} 