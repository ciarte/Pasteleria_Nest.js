import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Photo } from '../photo/photo.entity';
import { PhotosModule } from '../photo/photos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Photo]),
    CloudinaryModule,
    PhotosModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
