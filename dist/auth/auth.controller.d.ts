import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SetNewPasswordDto } from './dto/set-new-password.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                name: string | null;
                id: string;
                createdAt: Date;
                email: string;
            };
            token: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                id: string;
                email: string;
                name: string | null;
                createdAt: Date;
            };
            token: string;
        };
    }>;
    getProfile(req: any): Promise<{
        success: boolean;
        data: {
            name: string | null;
            id: string;
            createdAt: Date;
            _count: {
                projects: number;
            };
            email: string;
        } | null;
    }>;
    verifyToken(req: any): Promise<{
        success: boolean;
        data: {
            valid: boolean;
            user: any;
        };
    }>;
    setNewPassword(id: string, dto: SetNewPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
