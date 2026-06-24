import { AppDataSource } from '../data-source';
import { filmsSeed } from './films.seed';
import { schedulesSeed } from './schedules.seed';
import { FilmEntity } from '../entities/film.entity';
import { ScheduleEntity } from '../entities/schedule.entity';

export async function runSeeds() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const filmCount = await AppDataSource.getRepository(FilmEntity).count();
  const scheduleCount = await AppDataSource.getRepository(ScheduleEntity).count();

  if (filmCount > 0 || scheduleCount > 0) {
    console.log('🌱 Seed skipped (already exists)');
    return;
  }

  await filmsSeed();
  await schedulesSeed();

  await AppDataSource.destroy();
}