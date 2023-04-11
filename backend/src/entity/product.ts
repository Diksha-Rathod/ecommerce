import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToMany,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { Cart } from "./cart";
import { orderDetails } from "./orderDetails";
import { blob } from "node:stream/consumers";
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  details: string;

  @Column()
  price: number;

  @Column()
  totalQuantity: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updateAt: Date;

  @Column()
  productImg: string;

  @OneToMany(() => Cart, (cart) => cart.product)
  cart: Cart;
  static price: any;

  @OneToMany(() => orderDetails, (order) => order.product)
  order: Cart;
}
