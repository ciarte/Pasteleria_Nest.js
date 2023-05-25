import {
  Controller,
  UploadedFiles,
  UseInterceptors,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ProductDto } from './dto/product.dto';
import { PhotoDto } from 'src/photo/dto/photo.dto';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() productData: ProductDto,
  ) {
    const uploadedPhotos: PhotoDto[] = [];
    for (const file of files) {
      const uploadedPhoto = await this.productService.uploadImageToCloudinary(
        file,
      );
      const photosToUpload = {
        url: uploadedPhoto.url,
        cakeId: productData.cakeName,
      };
      uploadedPhotos.push(photosToUpload);
    }
    productData.photos = uploadedPhotos;
    const newProduct = await this.productService.createProducts(productData);

    const newPhoto = await this.productService.savePhotos(
      newProduct.cakeName,
      uploadedPhotos,
    );
    console.log(newPhoto, 'esto es el producto final');
    return newPhoto;
  }

  @Get()
  async getAllProducts(){
    return this.productService.getAllProducts()
  }
  @Get(':id')
  async getProductById(@Param() id: string ): Promise<Product>{
    return this.productService.getProduct(id)
  }
  @Delete(':id')
  async deleteProduct(@Param() id: string){
    return this.productService.deleteProduct(id)
  }
  @Patch(':id')
  async updateProduct(@Param() id: string, @Body() product: UpdateProductDto){
    return this.productService.updateProduct(id, product)
  }
  
}
