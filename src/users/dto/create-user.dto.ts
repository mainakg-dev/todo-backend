import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({ description: 'email of the user' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ description: 'password of the user' })
  password: string;
}
