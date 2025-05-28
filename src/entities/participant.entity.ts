import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';
import { Car } from './car.entity';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.participants, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => Event, event => event.participants)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  event_id: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Car, car => car.participants, { nullable: true })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ nullable: true })
  car_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
} 