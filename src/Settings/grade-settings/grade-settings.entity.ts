import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tblgradesettings' })

export class GradeSettingsEntity {
  @PrimaryGeneratedColumn()
  GradeID: number;

  @Column({ default: '' })
  TypeofFabric: string;

  @Column({ default: '' })
  InspectionProcess: string;

  @Column({ default: '' })
  ByWidth: string;

  @Column({ default: '' })
  NarrowWidthMeter: string;

  @Column({ default: '' })
  Customer: string;

  @Column({ default: '' })
  internalGrade: string;

  @Column({ default: '' })
  MarketGrade: string;

  @Column({ default: '' })
  MinLen: string;

  @Column({ default: '' })
  MaxLen: string;

  @Column({ default: '' })
  TPJoints: string;

  @Column({ default: '' })
  Joints: string;

  @Column({ default: '' })
  NoOfMajor: string;

  @Column({ default: '' })
  SqYrd: string;

  @Column({ default: '' })
  SqYrdStatus: string;

  @Column({ default: '' })
  SqYrdFrom: string;

  @Column({ default: '' })
  SqYrdTo: string;

  @Column({ default: '' })
  Continuous: string;

  @Column({ default: '' })
  SV: string;

  @Column({ default: '' })
  LessWidth: string;

  @Column({ default: '' })
  MtrAllowance: string;

  @Column({ default: '' })
  AddMajor: string;

  @Column({ default: 0 })
  MinimumPiece: number;

  @Column({ default: 0 })
  MinimumRoll: number;

  @Column({ default: 0 })
  MinLength: number;

  @Column({ default: 0 })
  MaxLength: number;

  @Column({ default: 0 })
  NoMajor: number;

  @Column({ default: 0 })
  Minpoints: number;

  @Column({ default: 0 })
  MaxPoints: number;

  @Column({ default: '' })
  Quality: string;

  @Column({ default: 0 })
  MinSL: number;

  @Column({ default: 0 })
  MaxSL: number;

  @Column({ default: '' })
  SLGrade: string;

  @Column({ default: '' })
  MaxFresh: string;

  @Column({ default: 0 })
  EnterById: number;

  @Column({ default: '' })
  EnterByDate: string;

  @Column({ default: '' })
  MajorConsider: string;

  @Column({ default: 0 })
  ModifiedById: number;

  @Column({ default: '' })
  ModifiedByDate: string;

  @Column({ default: '' })
  ModifiedReason: string;

  @Column({ default: 0 })
  DeleteById: number;

  @Column({ default: '' })
  DeleteByDate: string;

  @Column({ default: '' })
  DeleteReason: string;

  @Column({ default: '' })
  ApprovalStatus: string;

  @Column({ default: '' })
  ExtraField1: string;

  @Column({ default: '' })
  ExtraField2: string;

  @Column({ default: '' })
  ExtraField3: string;

  @Column({ default: '' })
  ExtraField4: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}