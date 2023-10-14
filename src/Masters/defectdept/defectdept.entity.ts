import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastdefectdept' })

export class DefectDeptEntity {
  @PrimaryGeneratedColumn()
  DefectDeptID: number;

  @Column({ default: 0 })
  FabricTypeID: number;

  @Column({ default: '' })
  ByProcess: string;

  @Column({ default: '' })
  Code: string;

  @Column({ default: '' })
  Name: string;

  @Column({ default: '' })
  Image: string;

  @Column({ default: '' })
  EntryDate: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}