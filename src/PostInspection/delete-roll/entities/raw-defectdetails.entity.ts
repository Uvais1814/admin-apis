import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rawdefectdetails' })

export class RawDefectDetailsEntity {
  @PrimaryGeneratedColumn()
  DeftID: number;

  @Column({ default: 0 })
  InspID: number;

  @Column({ default: '' })
  MachineNo: string;

  @Column({ default: '' })
  DeftLeftID: string;

  @Column({ default: '' })
  DeftRightID: string;

  @Column({ default: 0 })
  DeftStMeter: number;

  @Column({ default: 0 })
  DeftEndMeter: number;

  @Column({ default: '' })
  RollNo: string;

  @Column({ default: '' })
  InspectionType: string;

  @Column({ default: '' })
  PanelInfo: string;

  @Column({ default: '' })
  DeftDept: string;

  @Column({ default: '' })
  Department: string;

  @Column({ default: '' })
  DeftCode: string;

  @Column({ default: '' })
  DeftName: string;

  @Column({ default: 0 })
  DeftPoint: number;

  @Column({ default: '' })
  DeftRemarks: string;

  @Column({ default: '' })
  DeftContinuous: string;

  @Column({ default: '' })
  DeftSerious: string;

  @Column({ default: '' })
  DeftJoin: string;

  @Column({ default: '' })
  DeftCuttable: string;

  @Column({ default: '' })
  DeftWhiteTag: string;

  @Column({ default: '' })
  DeftRedTag: string;

  @Column({ default: '' })
  DeftRemark: string;

  @Column({ default: '' })
  DeftMending: string;

  @Column({ default: '' })
  DeftMendingTime: string;

  @Column({ default: '' })
  DeftLogin1: string;

  @Column({ default: '' })
  DeftLogin2: string;

  @Column({ default: '' })
  DeftShift: string;

  @Column({ default: '' })
  DeftDate: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}