import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        user: {
            name: string | null;
            id: string;
            createdAt: Date;
            email: string;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            createdAt: Date;
        };
        token: string;
    }>;
    getProfile(userId: string): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        _count: {
            projects: number;
        };
        email: string;
    } | null>;
    private generateToken;
    setNewPassword(userId: string, newPassword: string): Promise<void>;
}
