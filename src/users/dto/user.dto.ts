import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsEmail()
  email: string;
  @MinLength(5)
  @MaxLength(12)
  password: string;
}
