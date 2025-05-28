import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { FirebaseService } from '../../firebase/firebase.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly firebaseService: FirebaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      this.logger.log(`Attempting to register user with email: ${registerDto.email}`);
      const user = await this.usersService.create(registerDto);
      
      // Generate JWT token
      const token = this._generateToken(user);
      
      // Format response to match frontend expectations
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          telephone: user.telephone
        }
      };
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const user = await this.usersService.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate JWT token
    const token = this._generateToken(user);
    
    // Format response to match frontend expectations
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        telephone: user.telephone
      }
    };
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
      
      // Generate JWT token
      const jwtToken = this._generateToken(user);
      
      // Format response to match frontend expectations
      return {
        token: jwtToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          telephone: user.telephone
        }
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private _generateToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
} 