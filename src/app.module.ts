import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PhotosModule } from './photo/photos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'pasteleria',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductsModule,
    CloudinaryModule,
    PhotosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
