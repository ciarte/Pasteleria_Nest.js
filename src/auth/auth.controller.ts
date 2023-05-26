import { Body, Controller,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  signIn(@Body() signInDto: UserDto) {
    return this.authService.singIn(signInDto);
  }
}
