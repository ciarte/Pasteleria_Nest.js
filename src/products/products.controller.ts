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
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ProductDto } from './dto/product.dto';
import { PhotoDto } from 'src/photo/dto/photo.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
    return newPhoto;
  }

  @Get()
  async getAviableProducts() {
    return this.productService.getAviableProducts();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/admin/all')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
  @Get(':cakeName')
  async getProductById(@Param('cakeName') cakeName: string) {
    return this.productService.getProduct(cakeName);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param() id: string) {
    return this.productService.deleteProduct(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProduct(@Param() id: string, @Body() product: UpdateProductDto) {
    return this.productService.updateProduct(id, product);
  }
}
