import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Repository } from 'typeorm';
import { PhotoDto } from './dto/photo.dto';


@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  // async createPhoto(image: PhotoDto) {
  //   const productFound = await this.photoRepository.findOne({
  //     where: {
  //       cakeId: image.cakeId,
  //     },
  //   });
  //   if (productFound) {
  //     throw new BadRequestException('Product already exists');
  //   }
  //   const newImage = this.photoRepository.create({
  //     url: image.url,
  //     cakeId: image.cakeId,
  //   });
  //   return await this.photoRepository.save(newImage);
  // }
 
}
