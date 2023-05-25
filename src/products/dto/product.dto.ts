import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsInt,
  IsArray,
} from 'class-validator';
import { PhotoDto } from 'src/photo/dto/photo.dto';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  cakeName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsInt()
  price: number;

  @IsArray()
  photos: PhotoDto[];
}
