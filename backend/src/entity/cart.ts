import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user";
import { Product } from "./product";
@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  userId: number;

  @Column({ type: "int", nullable: false })
  productId: number;

  @Column({  nullable: false })
  productName: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  totalAmount: number;


  @JoinTable()
  @ManyToOne(
    (type) => User,
    (user) => user.id, { onDelete: 'CASCADE'})
  user: User[];

  @JoinTable()
  @ManyToOne(
    (type) => Product,
    (product) => product.id, { onDelete: 'CASCADE' })
     product: Product[];
}
