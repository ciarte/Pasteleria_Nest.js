import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsUUID } from 'class-validator';
import { Product } from 'src/products/product.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  @IsUUID()
  id: string;
  @Column()
  url: string;
  @Column()
  cakeId: string;
  @ManyToOne(() => Product, (product) => product.photos)
  product: Product;

}

