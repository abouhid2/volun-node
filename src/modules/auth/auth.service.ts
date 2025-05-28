import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.create(registerDto);
      
      // We return the user without the password_digest
      const { password_digest, ...result } = user;
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const user = await this.usersService.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // In a real-world application, we would generate a JWT token here
    // For now, we'll just return the user without the password_digest
    const { password_digest, ...result } = user;
    return result;
  }

  async validateFirebaseToken(token: string) {
    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      
      // Check if the user exists in our database
      let user = await this.usersService.findByEmail(decodedToken.email);
      
      // If the user doesn't exist, create a new one
      if (!user) {
        user = await this.usersService.create({
          name: decodedToken.name || 'Firebase User',
          email: decodedToken.email,
          password: Math.random().toString(36).slice(-8), // Generate a random password
        });
      }
      
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
} 