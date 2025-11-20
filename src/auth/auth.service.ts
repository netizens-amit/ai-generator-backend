  import { Injectable, ConflictException, UnauthorizedException, Logger, NotFoundException } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { PrismaService } from '../prisma/prisma.service';
  import * as bcrypt from 'bcrypt';
  import { RegisterDto } from './dto/register.dto';
  // import { UpdatePasswordDto } from './dto/set-new-password.dto';
  import { LoginDto } from './dto/login.dto';

  @Injectable()
  export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
      
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      
      const token = this.generateToken(user.id, user.email);

      this.logger.log(`✅ User registered: ${user.email}`);

      return {
        user,
        token,
      };
    }

    async login(dto: LoginDto) {
      
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      
      const token = this.generateToken(user.id, user.email);

      this.logger.log(`✅ User logged in: ${user.email}`);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
        token,
      };
    }

    async getProfile(userId: string) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          _count: {
            select: {
              projects: true,
            },
          },
        },
      });

      return user;
    }

    private generateToken(userId: string, email: string): string {
      const payload = { sub: userId, email };
      return this.jwtService.sign(payload);
    }


  async setNewPassword(userId: string, newPassword: string) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      const hashed = await bcrypt.hash(newPassword, 12);

      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashed },
      });
  }
  }