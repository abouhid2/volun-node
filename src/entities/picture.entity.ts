import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageable_type: string;

  @Column()
  imageable_id: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 