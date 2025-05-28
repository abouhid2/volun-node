import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ 
      where: { deleted_at: null },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id, deleted_at: null },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { email, deleted_at: null },
      select: ['id', 'name', 'email', 'password_digest', 'telephone', 'created_at', 'updated_at'],
    });
    
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = this.usersRepository.create({
      ...createUserDto,
      password_digest: hashedPassword,
    });
    
    return this.usersRepository.save(user);
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
        where: { email: updateUserDto.email, deleted_at: null } 
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
    user.deleted_at = new Date();
    await this.usersRepository.save(user);
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