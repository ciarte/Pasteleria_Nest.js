import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UserController {


  
}
