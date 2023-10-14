import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'actualentry' })
export class ActualEntryEntity {

  @PrimaryGeneratedColumn()
  AddWidthID: number;

  @Column({ default: '' })
  EPI: string;

  @Column({ default: '' })
  PPI: string;

  @Column({ default: '' })
  Width: string;

  @Column({ default: '' })
  CutLineEntry: string;

  @Column({ default: '' })
  SatinBandA: string;

  @Column({ default: '' })
  SatinBandB: string;

  @Column({ default: '' })
  SatinBandC: string;

  @Column({ default: '' })
  SatinBandD: string;

  @Column({ default: '' })
  SatinBandE: string;

  @Column({ default: '' })
  SatinBandF: string;

  @Column({ default: '' })
  RollNo: string;

  @Column({ default: '' })
  InspectionType: string;

  @Column({ default: '' })
  PanelInfo: string;

  @Column({ default: 0 })
  Meter: number;

  @Column({ default: '' })
  EntryDate: string;

  @Column({ default: 1 })
  Activestatus: number;

  @Column({ default: '' })
  Plant: string;

}