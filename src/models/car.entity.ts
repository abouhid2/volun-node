import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { Participant } from './participant.entity';
import { Donation } from './donation.entity';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_id: number;

  @Column({ nullable: true })
  seats: number;

  @Column({ nullable: true })
  driver_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Event, event => event.cars)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Participant, participant => participant.car)
  participants: Participant[];

  @OneToMany(() => Donation, donation => donation.car)
  donations: Donation[];
} 