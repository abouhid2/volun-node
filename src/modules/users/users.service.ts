import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'name', 'email', 'password_digest', 'telephone', 'created_at', 'updated_at'],
    });
    
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    
    this.logger.log(`Checking if user with email ${email} already exists`);
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      this.logger.warn(`User with email ${email} already exists`);
      throw new BadRequestException('User with this email already exists');
    }
    
    try {
      this.logger.log('Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);
    
      this.logger.log('Creating user entity');
    const user = this.usersRepository.create({
      ...createUserDto,
      password_digest: hashedPassword,
    });
    
      this.logger.log('Saving user to database');
      return await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw new BadRequestException(`Failed to create user: ${error.message}`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    const updatedData: any = { ...updateUserDto };
    
    if (updateUserDto.password) {
      updatedData.password_digest = await bcrypt.hash(updateUserDto.password, 10);
      delete updatedData.password;
    }
    
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({ 
        where: { email: updateUserDto.email } 
      });
      
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }
    }
    
    Object.assign(user, updatedData);
    
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.softRemove(user);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    
    if (!user) {
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password_digest);
    
    if (!isPasswordValid) {
      return null;
    }
    
    return user;
  }
} 