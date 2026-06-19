import { DataSource } from 'typeorm';

export async function resetSeed(ds: DataSource) {
  await ds.query(`TRUNCATE TABLE schedules CASCADE`);
  await ds.query(`TRUNCATE TABLE films CASCADE`);

}