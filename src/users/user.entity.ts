import { IsUUID } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  @IsUUID()
  id: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
}