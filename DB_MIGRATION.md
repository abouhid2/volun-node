# Working with Existing Database in NestJS

This guide explains how to connect NestJS with TypeORM to an existing database that was previously used with Ruby on Rails.

## Initial Setup

1. Make sure your `.env` file has the correct database credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

Or use a single DATABASE_URL:

```
DATABASE_URL=postgres://username:password@host:port/database
```

2. We've disabled `synchronize: true` in the TypeORM configuration to prevent TypeORM from trying to create tables that already exist.

## Entity Definitions

Your TypeORM entity definitions need to match your existing database schema. There are two ways to handle this:

### 1. Manually Update Entity Files

Review your Rails schema and ensure your NestJS entity files match the existing database structure:

- Table names (using the `@Entity('table_name')` decorator)
- Column names and types
- Primary keys, foreign keys, and relationships

### 2. Reverse Engineer Entities

Use the provided script to generate entity files from your existing database:

```bash
# Install the required tool
npm install -g typeorm-model-generator

# Run the script
npx ts-node src/scripts/generate-entities.ts
```

## Making Changes to the Database

Once connected to your existing database, you have several options for making changes:

### 1. Generate and Run Migrations

```bash
# Generate a migration
npm run migration:generate --name=AddNewColumn

# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert
```

### 2. Inspect Schema Differences

```bash
# Log schema differences between entities and database
npm run schema:log
```

## Best Practices

1. Never use `synchronize: true` in production or with existing databases
2. Always use migrations for database changes
3. Keep your entity definitions in sync with your database schema
4. Test migrations thoroughly before applying them to production

## Troubleshooting

If you encounter errors related to existing relations, make sure:

1. Your entity definitions match the existing tables exactly
2. You have `synchronize: false` in your TypeORM configuration
3. Your migrations don't attempt to create tables that already exist
