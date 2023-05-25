import { IsNotEmpty, IsString } from "class-validator";

export class PhotoDto {
  @IsString()
  @IsNotEmpty()
  url: string;
  @IsString()
  cakeId: string;
}
