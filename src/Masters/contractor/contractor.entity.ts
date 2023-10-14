import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastcontractor' })
export class ContractorEntity {
  @PrimaryGeneratedColumn()
  ContractorID: number;

  @Column({ default: '' })
  ContractorCode: string;

  @Column({ default: '' })
  ContractorName: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}