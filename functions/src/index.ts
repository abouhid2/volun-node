import * as functions from 'firebase-functions';
import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello from Firebase Functions with TypeScript!');
});

export const api = functions.https.onRequest(app);
