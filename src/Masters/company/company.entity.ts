import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastcompany' })

export class CompanyEntity {
  @PrimaryGeneratedColumn()
  CompanyID: number;

  @Column({ default: '' })
  CompanyName: string;

  @Column()
  Logo: Buffer;

  @Column({ default: '' })
  Caption: string;

  @Column({ default: '' })
  Address: string;

  @Column({ default: '' })
  TINNo: string;

  @Column({ default: '' })
  CSTNo: string;

  @Column({ default: '' })
  Phone: string;

  @Column({ default: '' })
  Email: string;

  @Column({ default: '' })
  Website: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}