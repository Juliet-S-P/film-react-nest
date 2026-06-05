import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column('float')
  price: number;

  @Column('text')
  taken: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  @JoinColumn({
    name: 'filmId',
  })
  film: FilmEntity;
}
