import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastshiftdetails' })
export class ShiftEntity {
  @PrimaryGeneratedColumn()
  ShiftID: number;

  @Column({ default: '' })
  Department: string;

  @Column({ default: '' })
  ShiftName: string;

  @Column({ default: '' })
  StartTime: string;

  @Column({ default: '' })
  EndTime: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}