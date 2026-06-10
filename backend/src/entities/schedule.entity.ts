import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column('int')
  hall: number;

  @Column('int')
  rows: number;

  @Column('int')
  seats: number;

  @Column('float')
  price: number;

  @Column('text', { array: true })
  taken: string[];

  @Column()
  filmId: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;
}
