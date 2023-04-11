import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
@Entity()
export class paymentDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mode: string;

  @Column()
  status: string;

  @Column()
  amount:number;
  save: any;
}