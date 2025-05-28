import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from .env file
config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'volun_node_dev',
  synchronize: false,
  entities: [],
});

// Initialize the data source
dataSource.initialize()
  .then(async () => {
    // Generate entity files based on your existing database schema
    const outputPath = join(__dirname, '..', 'entities-generated');
    
    try {
      await dataSource.driver.createSchemaBuilder().log();
      console.log('Database schema logged successfully.');
      
      console.log('You can now generate migration files with:');
      console.log('npm run migration:generate --name=YourMigrationName');
      
      console.log('\nTo reverse engineer entities from your database:');
      console.log('1. Install typeorm-model-generator:');
      console.log('npm install -g typeorm-model-generator');
      console.log('\n2. Run the command:');
      console.log(`typeorm-model-generator -h ${process.env.DB_HOST || 'localhost'} -d ${process.env.DB_NAME || 'volun_node_dev'} -u ${process.env.DB_USERNAME || 'postgres'} -x ${process.env.DB_PASSWORD || 'postgres'} -e postgres -o ${outputPath}`);
    } catch (err) {
      console.error('Error generating schema:', err);
    } finally {
      await dataSource.destroy();
    }
  })
  .catch((err) => {
    console.error('Error during DataSource initialization:', err);
  }); 