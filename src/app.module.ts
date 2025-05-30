import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from './firebase/firebase.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EntitiesModule } from './modules/entities/entities.module';
import { EventsModule } from './modules/events/events.module';
import { ParticipantsModule } from './modules/participants/participants.module';
import { CarsModule } from './modules/cars/cars.module';
import { DonationsModule } from './modules/donations/donations.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Get the DATABASE_URL or build connection from individual params
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        if (databaseUrl) {
          // Parse DATABASE_URL format: postgres://username:password@host:port/database
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [__dirname + '/entities/*.entity{.ts,.js}'],
            synchronize: configService.get('NODE_ENV') !== 'production',
            logging: configService.get('NODE_ENV') !== 'production',
            ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
          };
        } else {
          // Use individual parameters
          return {
            type: 'postgres',
            host: configService.get('DB_HOST', 'localhost'),
            port: configService.get<number>('DB_PORT', 5432),
            username: configService.get('DB_USERNAME', 'postgres'),
            password: configService.get('DB_PASSWORD', 'postgres'),
            database: configService.get('DB_NAME', 'volun_node_dev'),
            entities: [__dirname + '/entities/*.entity{.ts,.js}'],
            synchronize: configService.get('NODE_ENV') !== 'production',
            logging: configService.get('NODE_ENV') !== 'production',
          };
        }
      },
    }),
    FirebaseModule,
    UsersModule,
    AuthModule,
    EntitiesModule,
    EventsModule,
    ParticipantsModule,
    CarsModule,
    DonationsModule,
    CommentsModule,
  ],
})
export class AppModule {} 