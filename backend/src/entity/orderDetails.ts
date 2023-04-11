import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
} from "typeorm";
import { Product } from "./product";
import { User } from "./user";
import { paymentDetails } from "./paymentDetails";
@Entity()
export class orderDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column("int")
  amount: number;

  @Column({ type: "int", nullable: false })
  userId: number;

  @Column({ type: "int", nullable: false })
  productId: number;

  @Column()
  productName: string;

  @Column()
  status: string;

  @Column({ type: "int", nullable: true })
  paymentId: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updateAt: Date;

  @DeleteDateColumn({ name: "deletdAt" })
  deletedAt: Date;

  @JoinTable()
  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User[];

  @JoinTable()
  @ManyToOne((type) => Product, (product) => product.id, { onDelete: 'CASCADE'})
  product: Product[];

  @JoinTable()
  @ManyToOne((type) => paymentDetails, (payment) => payment.id, {
    onDelete: 'CASCADE'
  })
  payment: paymentDetails[];
}
