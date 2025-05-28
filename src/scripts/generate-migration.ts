import { AppDataSource } from '../../typeorm.config';

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    
    // Run pending migrations
    await AppDataSource.runMigrations();
    console.log('Migrations have been executed successfully!');
    
    await AppDataSource.destroy();
    console.log('Data Source has been destroyed.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error during migration execution:', error);
    process.exit(1);
  }
}

main(); 