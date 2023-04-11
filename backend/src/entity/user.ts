import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Cart } from "./cart";
import { orderDetails } from "./orderDetails";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    type: "enum",
    enum: [Role.ADMIN, Role.USER],
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  stripeCustomerId: string;

  @Column({ nullable: false, unique: true })
  password: string;

  @Column({ nullable: false, unique: true })
  userToken: string;

  @Column({ nullable: true, unique: true })
  forgotPasswordToken: string;

  @Column({ nullable: true, unique: true })
  verificationToken: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @Column({ nullable: true, unique: true })
  contactNumber: string;

  @Column({ nullable: true })
  DOB: string;

  @Column({ nullable: true ,default: "India"})
  country: string;


  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updateAt: Date;

  @Column({nullable: true})
  profileImg: string;

  @JoinTable()
  @OneToMany((type) => Cart, (cart) => cart.userId, { onDelete: 'CASCADE' })
  cart: Cart[];

  @JoinTable()
  @OneToMany((type) => orderDetails, (cart) => cart.userId, { onDelete: 'CASCADE' })
  order: orderDetails[];
}
