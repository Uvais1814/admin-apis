import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'DespatchEntry' })

export class DespatchEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  DespatchID: number;

  @Column({ default: '' })
  JumboBatchNo: string;

  @Column({ default: '' })
  RollNo: string;

  @Column({ default: '' })
  TotalMeters: string;

  @Column({ default: '' })
  Grade: string;

  @Column({ default: '' })
  Netwt: string;

  @Column({ default: '' })
  GrossWt: string;

  @Column({ default: '' })
  TotalPoints: string;

  @Column({ default: '' })
  RollWidth: string;

  @Column({ default: '' })
  RollLinMtr: string;

  @Column({ default: '' })
  RollSqMtr: string;

  @Column({ default: '' })
  StdWidth: string;

  @Column({ default: '' })
  GrandTotalMeter: string;

  @Column({ default: '' })
  GrandNetWt: string;

  @Column({ default: '' })
  GrandGrossWt: string;

  @Column({ default: '' })
  GrandTotalPoint: string;

  @Column({ default: '' })
  GrandSqMtr: string;

  @Column({ default: '' })
  GrandLinMtr: string;

  @Column({ default: '' })
  EnterByID: string;

  @Column({ default: '' })
  EnterByTime: string;

  @Column({ default: '' })
  EnterByDate: Date;

  @Column({ default: '' })
  StatusInfo: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}