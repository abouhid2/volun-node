import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity({ name: 'donation_settings' })
export class DonationSetting {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Event, event => event.donation_settings)
  @JoinColumn({ name: 'event_id' })
  event: Event;
} 