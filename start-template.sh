#!/bin/bash

# Copy this file to start-dev.sh or start-with-env.sh and fill in the values

# Database configuration
export DATABASE_URL=postgres://username:password@host:port/database_name
export VOLUN_DATABASE_USER=username

# Frontend URL
export FRONTEND_URL=https://your-frontend-url.com

# Environment
export NODE_ENV=development # or production
export PORT=3001

# Firebase config
export FIREBASE_PROJECT_ID=your-project-id
export FIREBASE_CLIENT_EMAIL=your-client-email
export FIREBASE_PRIVATE_KEY="your-private-key"
export FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Start the application
npm run start:dev # or npm run start:prod 