import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastinspectionmachine' })
export class InspectionMachineEntity {
  @PrimaryGeneratedColumn()
  InspectionMachineID: number;

  @Column({ default: 0 })
  InspectionShedID: number;

  @Column({ default: '' })
  InspectionType: string;

  @Column({ default: '' })
  InspectionMachineCode: string;

  @Column({ default: '' })
  InspectionMachineName: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Date: string;

  @Column({ default: 0 })
  ConfigNo: number;

  @Column({ default: 0 })
  WheelCircum: number;

  @Column({ default: 0 })
  PulsePerRotation: number;

  @Column({ default: 0 })
  IPScale: number;

  @Column({ default: 0 })
  DisplayResolution: number;

  @Column({ default: '' })
  Comport: string;

  @Column({ default: '' })
  ResetTo: string;

  @Column({ default: '' })
  PrinterShareName: string;

  @Column({ default: '' })
  MachineType: string;

  @Column({ default: '' })
  Plant: string;
}