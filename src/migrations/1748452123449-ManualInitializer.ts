import { MigrationInterface, QueryRunner } from "typeorm";

export class ManualInitializer1748452123449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      // Create users table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR,
          email VARCHAR,
          password_digest VARCHAR,
          telephone VARCHAR,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
          deleted_at TIMESTAMP
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_users_on_deleted_at ON users (deleted_at)`);

      // Create entities table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS entities (
          id SERIAL PRIMARY KEY,
          name VARCHAR,
          description TEXT,
          logo_url VARCHAR,
          website VARCHAR,
          address VARCHAR,
          phone VARCHAR,
          email VARCHAR,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
          deleted_at TIMESTAMP,
          user_id INTEGER REFERENCES users(id)
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_entities_on_deleted_at ON entities (deleted_at)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_entities_on_user_id ON entities (user_id)`);

      // Create events table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS events (
          id SERIAL PRIMARY KEY,
          title VARCHAR,
          description TEXT,
          date TIMESTAMP,
          time TIMESTAMP,
          location VARCHAR,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
          entity_id INTEGER REFERENCES entities(id),
          deleted_at TIMESTAMP,
          user_id INTEGER REFERENCES users(id)
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_events_on_deleted_at ON events (deleted_at)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_events_on_entity_id ON events (entity_id)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_events_on_user_id ON events (user_id)`);

      // Create cars table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS cars (
          id SERIAL PRIMARY KEY,
          event_id INTEGER NOT NULL REFERENCES events(id),
          seats INTEGER,
          driver_name VARCHAR,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
          deleted_at TIMESTAMP
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_cars_on_deleted_at ON cars (deleted_at)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_cars_on_event_id ON cars (event_id)`);

      // Create participants table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS participants (
          id SERIAL PRIMARY KEY,
          user_id INTEGER,
          event_id INTEGER,
          status VARCHAR,
          name VARCHAR,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
          deleted_at TIMESTAMP,
          car_id INTEGER REFERENCES cars(id)
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_participants_on_deleted_at ON participants (deleted_at)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_participants_on_car_id ON participants (car_id)`);

      // Create comments table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS comments (
          id SERIAL PRIMARY KEY,
          content TEXT,
          event_id INTEGER NOT NULL REFERENCES events(id),
          user_id INTEGER REFERENCES users(id),
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_comments_on_event_id ON comments (event_id)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_comments_on_user_id ON comments (user_id)`);

      // Create donation_settings table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS donation_settings (
          id SERIAL PRIMARY KEY,
          event_id INTEGER NOT NULL REFERENCES events(id),
          types JSONB NOT NULL DEFAULT '[]',
          units JSONB NOT NULL DEFAULT '[]',
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
      
      await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS index_donation_settings_on_event_id ON donation_settings (event_id)`);

      // Create donations table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS donations (
          id SERIAL PRIMARY KEY,
          event_id INTEGER NOT NULL REFERENCES events(id),
          user_id INTEGER NOT NULL REFERENCES users(id),
          donation_type VARCHAR,
          quantity DECIMAL,
          unit VARCHAR,
          description TEXT,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
          deleted_at TIMESTAMP,
          car_id INTEGER REFERENCES cars(id)
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_donations_on_deleted_at ON donations (deleted_at)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_donations_on_event_id ON donations (event_id)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_donations_on_user_id ON donations (user_id)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_donations_on_car_id ON donations (car_id)`);

      // Create inventories table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS inventories (
          id SERIAL PRIMARY KEY,
          entity_id INTEGER NOT NULL REFERENCES entities(id),
          item_name VARCHAR NOT NULL,
          item_type VARCHAR NOT NULL,
          quantity DECIMAL(10,2) NOT NULL DEFAULT 0.0,
          unit VARCHAR NOT NULL,
          notes TEXT,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_inventories_on_entity_id ON inventories (entity_id)`);
      await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_inventory_unique_items ON inventories (entity_id, item_type, item_name, unit)`);

      // Create inventory_transactions table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS inventory_transactions (
          id SERIAL PRIMARY KEY,
          inventory_id INTEGER NOT NULL REFERENCES inventories(id),
          event_id INTEGER REFERENCES events(id),
          donation_id INTEGER REFERENCES donations(id),
          user_id INTEGER NOT NULL REFERENCES users(id),
          transaction_type VARCHAR NOT NULL,
          quantity DECIMAL(10,2) NOT NULL,
          notes TEXT,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_inventory_transactions_on_inventory_id ON inventory_transactions (inventory_id)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_inventory_transactions_on_event_id ON inventory_transactions (event_id)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_inventory_transactions_on_donation_id ON inventory_transactions (donation_id)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_inventory_transactions_on_user_id ON inventory_transactions (user_id)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_inventory_transactions_on_transaction_type ON inventory_transactions (transaction_type)`);

      // Create requests table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS requests (
          id SERIAL PRIMARY KEY,
          entity_id INTEGER NOT NULL REFERENCES entities(id),
          item_name VARCHAR,
          item_type VARCHAR,
          quantity DECIMAL(10,2) DEFAULT 1.0,
          unit VARCHAR,
          fulfilled BOOLEAN DEFAULT false,
          fulfilled_at TIMESTAMP,
          requested_by VARCHAR,
          requested_at TIMESTAMP,
          notes TEXT,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_requests_on_entity_id ON requests (entity_id)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_requests_on_fulfilled ON requests (fulfilled)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_requests_on_item_type ON requests (item_type)`);

      // Create pictures table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS pictures (
          id SERIAL PRIMARY KEY,
          imageable_type VARCHAR NOT NULL,
          imageable_id INTEGER NOT NULL,
          image_url VARCHAR,
          deleted_at TIMESTAMP,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
      
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_pictures_on_deleted_at ON pictures (deleted_at)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS index_pictures_on_imageable_type_and_imageable_id ON pictures (imageable_type, imageable_id)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      // Drop tables in reverse order of dependencies
      await queryRunner.query(`DROP TABLE IF EXISTS pictures`);
      await queryRunner.query(`DROP TABLE IF EXISTS inventory_transactions`);
      await queryRunner.query(`DROP TABLE IF EXISTS requests`);
      await queryRunner.query(`DROP TABLE IF EXISTS inventories`);
      await queryRunner.query(`DROP TABLE IF EXISTS donations`);
      await queryRunner.query(`DROP TABLE IF EXISTS donation_settings`);
      await queryRunner.query(`DROP TABLE IF EXISTS comments`);
      await queryRunner.query(`DROP TABLE IF EXISTS participants`);
      await queryRunner.query(`DROP TABLE IF EXISTS cars`);
      await queryRunner.query(`DROP TABLE IF EXISTS events`);
      await queryRunner.query(`DROP TABLE IF EXISTS entities`);
      await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }

}
