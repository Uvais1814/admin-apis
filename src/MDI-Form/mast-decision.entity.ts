import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'mastdecision' })
export class mastDecisionEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ default: '' })
  GradeDecision: string;

  @Column({ default: '' })
  MasterInput: string;

  @Column({ default: '' })
  InputFile: string;

  @Column({ default: '' })
  OutputFile: string;

  @Column({ default: '' })
  ImageFile: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  ReportFile: string;

  @Column({ default: '' })
  AdminServerEXE: string;

  @Column({ default: '' })
  InspectionServerEXE: string;

  @Column({ default: '' })
  OptimizationServerEXE: string;

  @Column({ default: '' })
  OpticutServerEXE: string;

  @Column({ default: '' })
  ReportsServerEXE: string;

  @Column({ default: '' })
  AdminEXE: string;

  @Column({ default: '' })
  InspectionEXE: string;

  @Column({ default: '' })
  OptimizationEXE: string;

  @Column({ default: '' })
  OpticutEXE: string;

  @Column({ default: '' })
  ReportsEXE: string;

  @Column({ default: '' })
  MissingRoll: string;

  @Column({ default: '' })
  SAPFIDASRoll: string;

  @Column({ default: '' })
  EditRoll: string;

  @Column({ default: '' })
  QualityMaster: string;

  @Column({ default: '' })
  SAPoldRollMissing: string;

  @Column({ default: '' })
  WareHouseServerExe: string;

  @Column({ default: '' })
  WareHouseExe: string;

  @Column({ default: '' })
  ShadeGroupServerExe: string;

  @Column({ default: '' })
  ShadeGroupExe: string;

  @Column({ default: '' })
  TECO: string;

  @Column({ default: '' })
  DESPATCH: string;

  @Column({ default: '' })
  CallLogServerExe: string;

  @Column({ default: '' })
  CallLogExe: string;
}