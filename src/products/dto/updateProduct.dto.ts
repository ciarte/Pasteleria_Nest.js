import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  cakeName?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  @IsInt()
  price?: number;

  @IsBoolean()
  deleted?: boolean;
}
