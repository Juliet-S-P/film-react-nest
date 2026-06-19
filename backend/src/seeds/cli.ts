import { runSeeds } from './seed.runner';


async function main() {

  await runSeeds();

}


main()
  .catch((error) => {
    console.error('❌ Seed error:', error);
    process.exit(1);
  });