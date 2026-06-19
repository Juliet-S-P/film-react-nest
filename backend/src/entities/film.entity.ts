import { Entity, Column, PrimaryColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { ScheduleEntity } from './schedule.entity';

@Entity('films')
export class FilmEntity {
  @PrimaryGeneratedColumn('uuid')
id: string;

  @Column('float')
  rating: number;

  @Column()
  director: string;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column('text')
  about: string;

  @Column('text')
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film)
  schedule: ScheduleEntity[];
}
