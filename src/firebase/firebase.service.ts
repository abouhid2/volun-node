import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);

  constructor(private configService: ConfigService) {
    if (!admin.apps.length) {
      try {
        const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
        const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
        const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');
        const databaseURL = this.configService.get<string>('FIREBASE_DATABASE_URL');

        if (!projectId || !clientEmail || !privateKey) {
          this.logger.warn('Firebase configuration incomplete. Some operations may not work correctly.');
        }

        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey: privateKey ? privateKey.replace(/\\n/g, '\n') : undefined,
          }),
          databaseURL,
        });
        
        this.logger.log('Firebase initialized successfully');
      } catch (error) {
        this.logger.error(`Error initializing Firebase: ${error.message}`);
      }
    }
  }

  getAuth() {
    return admin.auth();
  }

  getFirestore() {
    return admin.firestore();
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await this.getAuth().verifyIdToken(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

