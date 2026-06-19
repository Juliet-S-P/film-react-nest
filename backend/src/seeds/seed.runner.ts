import { AppDataSource } from '../data-source';

import { filmsSeed } from './films.seed';
import { schedulesSeed } from './schedules.seed';


async function resetDatabase(){

  await AppDataSource.query(`
    TRUNCATE TABLE schedules CASCADE;
    TRUNCATE TABLE films CASCADE;
  `);

}



export async function runSeeds(){

  await AppDataSource.initialize();


  await resetDatabase();


  await filmsSeed();


  await schedulesSeed();


  await AppDataSource.destroy();

}