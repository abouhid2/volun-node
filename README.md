# Volun-Node

A volunteer management system built with NestJS, TypeORM, and Firebase integration. This project is a migration from a Rails application to a modern Node.js stack.

## Features

- User authentication with Firebase
- Entity (organization) management
- Event management with recurrent event creation
- Participant management with car assignment
- Car management for event transportation
- Donation tracking and management
- Comment system for events
- Soft deletion support for most entities

## Tech Stack

- NestJS - A progressive Node.js framework
- TypeORM - ORM for TypeScript and JavaScript
- PostgreSQL - Relational database
- Firebase - Authentication and real-time updates
- TypeScript - Typed JavaScript
- class-validator & class-transformer - DTOs validation

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/volun-node.git

# Navigate to the project directory
cd volun-node

# Install dependencies
npm install
```

## Configuration

There are two ways to configure the application:

### 1. Using shell scripts (recommended)

We provide two shell scripts to set up environment variables:

```bash
# For development
./start-dev.sh

# For production
./start-with-env.sh
```

Edit these scripts to include your Firebase credentials.

### 2. Using .env file

Copy the `.env.example` file to `.env` and fill in your values:

```bash
cp .env.example .env
nano .env
```

The `.env` file should contain:

```
# Database Configuration
DATABASE_URL=postgres://username:password@host:port/database_name
VOLUN_DATABASE_USER=username
VOLUN_DATABASE_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=username
DB_PASSWORD=password
DB_NAME=volun_development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3001

# Environment
NODE_ENV=development
PORT=3001

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
```

## Database Setup

Make sure you have PostgreSQL installed and running.

For development:
```bash
createdb volun_development
```

For production:
```bash
createdb volun_production
```

## Running the App

Using the scripts:
```bash
# Development mode
./start-dev.sh

# Production mode
./start-with-env.sh
```

Or manually:
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email and password

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user (soft delete)

### Entities (Organizations)
- `GET /entities` - Get all entities
- `GET /entities/:id` - Get a specific entity
- `POST /entities` - Create a new entity
- `PATCH /entities/:id` - Update an entity
- `DELETE /entities/:id` - Delete an entity (soft delete)
- `POST /entities/:id/duplicate` - Duplicate an entity

### Events
- `GET /events` - Get all events
- `GET /events/:id` - Get a specific event
- `POST /events` - Create a new event
- `PATCH /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event (soft delete)
- `POST /events/:id/duplicate` - Duplicate an event
- `POST /events/:id/recurrent` - Create recurrent events

### Entity Events
- `GET /entities/:entityId/events` - Get all events for an entity
- `POST /entities/:entityId/events` - Create a new event for an entity

### Participants
- `GET /events/:eventId/participants` - Get all participants for an event
- `POST /events/:eventId/participants` - Add a participant to an event
- `PATCH /events/:eventId/participants/:id` - Update a participant
- `DELETE /events/:eventId/participants/:id` - Remove a participant (soft delete)
- `POST /events/:eventId/participants/:id/duplicate` - Duplicate a participant

### Cars
- `GET /events/:eventId/cars` - Get all cars for an event
- `POST /events/:eventId/cars` - Add a car to an event
- `PATCH /events/:eventId/cars/:id` - Update a car
- `DELETE /events/:eventId/cars/:id` - Remove a car (soft delete)
- `POST /events/:eventId/cars/:id/duplicate` - Duplicate a car
- `POST /events/:eventId/cars/:id/clean_seats` - Remove all participants from a car
- `POST /events/:eventId/cars/:id/clean_donations` - Remove all donations from a car

### Donations
- `GET /events/:eventId/donations` - Get all donations for an event
- `POST /events/:eventId/donations` - Add a donation to an event
- `PATCH /events/:eventId/donations/:id` - Update a donation
- `DELETE /events/:eventId/donations/:id` - Remove a donation (soft delete)
- `POST /events/:eventId/donations/:id/duplicate` - Duplicate a donation
- `POST /events/:eventId/donations/:id/add_to_inventory` - Add a donation to inventory

### Comments
- `GET /events/:eventId/comments` - Get all comments for an event
- `POST /events/:eventId/comments` - Add a comment to an event
- `PATCH /events/:eventId/comments/:id` - Update a comment
- `DELETE /events/:eventId/comments/:id` - Remove a comment

## Authentication

This API uses Firebase Authentication. To authenticate, include the Firebase ID token in the Authorization header:

```
Authorization: Bearer <your-firebase-token>
```

## Migrating from Rails

This project is a migration from a Rails application. The database schema and endpoints have been designed to be compatible with the original application, making it easy to switch between backends.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
