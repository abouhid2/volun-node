import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Event } from './event.entity';
import { Participant } from './participant.entity';
import { Donation } from './donation.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.cars)
  @JoinColumn({ name: 'event_id' })
  event: Event;

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

  @OneToMany(() => Participant, participant => participant.car)
  participants: Participant[];

  @OneToMany(() => Donation, donation => donation.car)
  donations: Donation[];
} 