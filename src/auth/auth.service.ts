import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>, 
  ) {}

  async register(userRegister: UserDto) {
    const hash = 10;
    const emailExist = await this.usersRepository.findOne({
      where: { email: userRegister.email },
    });
    if (emailExist) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    const userExist = await this.usersRepository.findOne({
      where: { username: userRegister.username },
    });
    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const { password } = userRegister;
   
    const hashedPass = await bcrypt.hash(password, hash);
    const formatEmail = userRegister.email.toLowerCase();
    userRegister = {
      ...userRegister,
      password: hashedPass,
      email: formatEmail,
    };
    const newUser = this.usersRepository.create(userRegister);
    await this.usersRepository.save(newUser);
    return new HttpException(
      `User ${userRegister.username} and Email ${userRegister.email} successfully created`,
      HttpStatus.CREATED,
    );
  }

  async singIn(userLogin: UserDto) {
    const { username, password, email } = userLogin;
    const user = await this.usersRepository.findOne({
      where: {
        username,
        email,
      }
    });
    if (!user) {
      throw new HttpException('User or Email don`t exists', HttpStatus.NOT_FOUND);
    }
    const hash = user.password;
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('Password incorrect');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
