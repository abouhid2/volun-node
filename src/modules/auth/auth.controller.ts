import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: { user: RegisterDto }) {
    return this.authService.register(body.user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: { auth: LoginDto }) {
    return this.authService.login(body.auth);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }
  
  @Post('firebase-login')
  @HttpCode(HttpStatus.OK)
  firebaseLogin(@Body() { token }: { token: string }) {
    return this.authService.validateFirebaseToken(token);
  }
} 