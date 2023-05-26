import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductDto } from './dto/product.dto';
import { v4 } from 'uuid';
import { Photo } from 'src/photo/photo.entity';
import { PhotoDto } from 'src/photo/dto/photo.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private cloudinary: CloudinaryService,
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async createProducts(product: ProductDto): Promise<Product> {
    const productFound = await this.productRepository.findOne({
      where: {
        cakeName: product.cakeName,
      },
      relations: ['photos'],
    });

    if (productFound) {
      throw new HttpException('Product already exists', HttpStatus.CONFLICT);
    }

    const newProduct = this.productRepository.create({
      id: v4(),
      cakeName: product.cakeName,
      description: product.description,
      price: Number(product.price),
      deleted: false,
    });

    await this.productRepository.save(newProduct);

    return newProduct;
  }

  async createdPhoto(id: string, photos: PhotoDto) {
    const productFound = await this.productRepository.find({
      where: {
        id,
      },
    });
    if (!productFound) {
      throw new HttpException('Product don`t exists', HttpStatus.NOT_FOUND);
    }
    const newPhotos = this.photosRepository.create(photos);
    return newPhotos;
  }

  async savePhotos(cakeName: string, body: PhotoDto[]) {
    const product = await this.productRepository.findOne({
      where: {
        cakeName,
      },
    });
    if (product) {
      for (const photo of body) {
        const newPhoto = this.photosRepository.create(photo);
        newPhoto.product = product;
        await this.photosRepository.save(newPhoto);
      }
      const cakeFound = await this.productRepository.findOne({
        where: {
          cakeName,
        },
        relations: ['photos'],
      });
      return cakeFound;
    }
    throw new NotFoundException(`Not found ${cakeName}`);
  }

  async getAviableProducts() {
    const cakeFound = await this.productRepository.find({
      where: {
        deleted: false,
      },
      relations: ['photos'],
    });

    return cakeFound;
  }

  async getProduct(cakeName: string) {
    const productFound = await this.productRepository.findOne({
      where: {
        cakeName,
        deleted: false,
      },
      relations: ['photos'],
    });
    console.log(productFound);
    if (!productFound) throw new NotFoundException(`Not found${cakeName}`);
    return productFound;
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }

  async updateProduct(id: string, product: UpdateProductDto) {
    return this.productRepository.update(id, product);
  }

  async getAllProducts() {
    const cakeFound = await this.productRepository.find();

    return cakeFound;
  }
}
