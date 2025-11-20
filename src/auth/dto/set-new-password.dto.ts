// src/users/dto/set-new-password.dto.ts
import { IsString, MinLength, MaxLength } from 'class-validator';

export class SetNewPasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(72) // bcrypt practical limit
  newPassword: string;
}
