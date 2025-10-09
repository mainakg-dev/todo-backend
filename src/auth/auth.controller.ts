import {
  Controller,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { type Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { type Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.login(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { message: 'Login successful' };
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.authService.register(body.email, body.password);
    return new UserEntity(user);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
