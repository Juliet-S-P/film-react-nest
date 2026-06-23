import { runSeeds } from './seed.runner';

runSeeds()
  .then(() => {
    console.log('🌱 Seed finished');
  })
  .catch((e) => {
    console.error('❌ Seed error', e);
    process.exit(1);
  });