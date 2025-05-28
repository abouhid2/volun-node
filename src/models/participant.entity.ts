import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';
import { Car } from './car.entity';

@Entity({ name: 'participants' })
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column()
  event_id: number;

  @Column({ nullable: true })
  car_id: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, user => user.participations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Event, event => event.participants)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => Car, car => car.participants)
  @JoinColumn({ name: 'car_id' })
  car: Car;
} 