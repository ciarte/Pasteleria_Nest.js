import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { IsUUID } from 'class-validator';
import { Photo } from 'src/photo/photo.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  @IsUUID()
  id: string;
  @Column({ unique: true })
  cakeName: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column({ default: false })
  deleted: boolean;
  
  @OneToMany(() => Photo, (photo) => photo.product)
  photos: Photo[];
}
