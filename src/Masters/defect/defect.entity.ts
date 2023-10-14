import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastdefect' })

export class DefectEntity {
  @PrimaryGeneratedColumn()
  DefectId: number;

  @Column({ default: 0 })
  DefectDeptId: number;

  @Column({ default: 0 })
  FabricTypeId: number;

  @Column({ default: '' })
  Code: string;

  @Column({ default: '' })
  Defect: string;

  @Column({ default: '' })
  DefectType: string;

  @Column({ default: '' })
  ByProcess: string;

  @Column({ default: '' })
  Seriousness: string;

  @Column({ default: '' })
  Image: string;

  @Column({ default: '' })
  Points: string;

  @Column({ default: '' })
  EntryDate: string;

  @Column({ default: '' })
  Category: string;

  @Column({ default: 0 })
  Man: number;

  @Column({ default: 0 })
  Machine: number;

  @Column({ default: 0 })
  Material: number;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}