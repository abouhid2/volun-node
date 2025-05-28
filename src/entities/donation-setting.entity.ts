import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity('donation_settings')
export class DonationSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.donation_settings)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  event_id: number;

  @Column({ type: 'jsonb', default: [] })
  types: string[];

  @Column({ type: 'jsonb', default: [] })
  units: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 