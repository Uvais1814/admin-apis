import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pl_entry' })
export class PackingListEntity {
  @PrimaryGeneratedColumn()
  PL_ID: number;

  @Column({ default: '' })
  PL_No: string;

  @Column({ default: '' })
  Wo_No: string;

  @Column({ default: '' })
  So_No: string;

  @Column({ default: '' })
  Customer_Name: string;

  @Column({ default: '' })
  SortNo: string;

  @Column({ default: '' })
  No_of_rolls: string;

  @Column({ default: '' })
  Entry_by_ID: string;

  @Column({ default: '' })
  TotalMeter: string;

  @Column({ default: '' })
  Total_GWT: string;

  @Column({ default: '' })
  Total_NWT: string;

  @Column({ default: '' })
  Total_Deft_Points: string;

  @Column({ default: '' })
  Total_sq_mtr: string;

  @Column({ default: '' })
  Total_sq_yard: string;

  @Column({ default: '' })
  Total_lin_meter: string;

  @Column({ default: '' })
  Entry_Time: string;

  @Column({ default: '' })
  Entry_Date: string;

  @Column({ default: 0 })
  Delivery_Status: number;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Delete_by_ID: string;

  @Column({ default: '' })
  Delete_by_Date: string;

  @Column({ default: '' })
  Delete_by_Time: string;

  @Column({ default: '' })
  EXF1: string;

  @Column({ default: '' })
  EXF2: string;

  @Column({ default: '' })
  EXF3: string;

  @Column({ default: '' })
  EXF4: string;
}