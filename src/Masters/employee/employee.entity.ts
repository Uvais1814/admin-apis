import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mastemployee' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  EmpId: number;

  @Column({ default: '' })
  EmpType: string;

  @Column({ default: '' })
  EmpContractor: string;

  @Column({ default: '' })
  EmpCode: string;

  @Column({ default: '' })
  EmpUser: string;

  @Column({ default: '' })
  EmpPass: string;

  @Column({ default: '' })
  EmpName: string;

  @Column({ type: 'longblob' })
  EmpImage: Buffer;

  @Column({ default: '' })
  EntryDate: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  InspectorType: string;

  @Column({ default: '' })
  Plant: string;
}