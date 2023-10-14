import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: 'masterapi' })

export class MasterAPIEntity {
  @PrimaryGeneratedColumn()
  API_ID: number;

  @Column({ default: '' })
  Forms: string;

  @Column({ default: '' })
  API_No: string;

  @Column({ default: '' })
  Host: string;

  @Column({ default: '' })
  Address: string;

  @Column({ default: '' })
  Query_Type: string;

  @Column({ default: '' })
  Username: string;

  @Column({ default: '' })
  Password: string;

  @Column({ default: '' })
  EF1: string;

  @Column({ default: '' })
  EF2: string;

  @Column({ default: '' })
  EF3: string;

  @Column({ default: '' })
  EF4: string;
}
