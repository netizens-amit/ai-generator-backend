import { Controller, Post, Body, Get, UseGuards, Request, HttpCode, HttpStatus, Put, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SetNewPasswordDto } from './dto/set-new-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.register(dto);
    return {
      success: true,
      message: 'User registered successfully',
      data: result,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return {
      success: true,
      message: 'Login successful',
      data: result,
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const profile = await this.authService.getProfile(req.user.id);
    return {
      success: true,
      data: profile,
    };
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verifyToken(@Request() req) {
    return {
      success: true,
      data: {
        valid: true,
        user: req.user,
      },
    };
  }

  @Patch(':id/newpassword')
  async setNewPassword(
    @Param('id') id: string,
    @Body() dto: SetNewPasswordDto,
  ) {
    await this.authService.setNewPassword(id, dto.newPassword);
    return { success: true, message: 'Password updated.' };
  }
}
