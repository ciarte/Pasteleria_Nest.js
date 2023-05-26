import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .addBearerAuth()
    .setTitle('Pastry API Documentation')
    .setDescription(
      'Pastry e-commerce, where the user can view products with their photos and descriptions, select and place an order. The administrator has the ability to create, edit, or modify the products fully or partially.',
    )
    .setVersion('1.0')
    .addTag('products')
    .addTag('photos')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Documentation', app, document);
  await app.listen(3000);
}
bootstrap();
