import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastcustomer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  CustomerID: bigint;

  @Column({ default: '' })
  CustomerCode: string;

  @Column({ default: '' })
  CustomerName: string;

  @Column({ default: '' })
  ConsultantPerson: string;

  @Column({ default: '' })
  State: string;

  @Column({ default: '' })
  City: string;

  @Column({ default: '' })
  PhoneNo: string;

  @Column({ default: '' })
  Address1: string;

  @Column({ default: '' })
  Address2: string;

  @Column({ default: '' })
  GST: string;

  @Column({ default: '' })
  PAN: string;

  @Column({ default: '' })
  Country: string;

  @Column({ default: '' })
  Date: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}