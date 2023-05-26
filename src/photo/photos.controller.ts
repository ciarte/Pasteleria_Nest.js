import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('photos')
@Controller('photo')
export class PhotosController {}
