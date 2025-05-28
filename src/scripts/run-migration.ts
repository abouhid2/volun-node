import { AppDataSource } from '../../typeorm.config';
import { ManualInitializer1748452123449 } from '../migrations/1748452123449-ManualInitializer';

async function main() {
  try {
    console.log('Initializing database connection...');
    await AppDataSource.initialize();
    console.log('Database connection established');
    
    // Get a query runner from the data source
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    
    console.log('Starting migration...');
    // Create an instance of the migration
    const migration = new ManualInitializer1748452123449();
    
    // Run the migration
    await migration.up(queryRunner);
    console.log('Migration completed successfully');
    
    // Release the query runner
    await queryRunner.release();
    
    // Close the database connection
    await AppDataSource.destroy();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error running migration:', error);
    process.exit(1);
  }
}

main(); 