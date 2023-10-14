import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'SAPUploaded' })
export class SAPUploadedEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  Trans_ID: number;

  @Column({ default: '' })
  InspID: string;

  @Column({ default: '' })
  ConfNo: string;

  @Column({ default: '' })
  ParentRoll: string;

  @Column({ default: '' })
  RollNo: string;

  @Column({ default: '' })
  StLoc: string;

  @Column({ default: '' })
  SupplierDCNo: string;

  @Column({ default: '' })
  InvNo: string;

  @Column({ default: '' })
  SalesOrderNo: string;

  @Column({ default: '' })
  Soline: string;

  @Column({ default: '' })
  PoNo: string;

  @Column({ default: '' })
  Po_Item: string;

  @Column({ default: '' })
  WorkCenter: string;

  @Column({ default: '' })
  Vendor_Code: string;

  @Column({ default: '' })
  VendorName: string;

  @Column({ default: '' })
  ProdOrder: string;

  @Column({ default: '' })
  OperationCode: string;

  @Column({ default: '' })
  OperationName: string;

  @Column({ default: '' })
  SortNo: string;

  @Column({ default: '' })
  Material: string;

  @Column({ default: '' })
  MatDescription: string;

  @Column({ default: '' })
  BeamNo1: string;

  @Column({ default: '' })
  MaterialDoc: string;

  @Column({ default: '' })
  INSPDate: Date;

  @Column({ default: '' })
  Shift: string;

  @Column({ default: 0 })
  InspTotalMeter: number;

  @Column({ default: 0 })
  InspTotalPoint: number;

  @Column({ default: 0 })
  InspNoofDefect: number;

  @Column({ default: 0.0 })
  SqMtr: number;

  @Column({ default: 0.0 })
  InspSqYard: number;

  @Column({ default: 0.0 })
  InspLineMeter: number;

  @Column({ default: '' })
  InspMachCode: string;

  @Column({ default: '' })
  InspMachine: string;

  @Column({ default: '' })
  EmpCode: string;

  @Column({ default: '' })
  Inspector: string;

  @Column({ default: '' })
  InspDuration: string;

  @Column({ default: '' })
  Grade: string;

  @Column({ default: '' })
  NoOfPiece: string;

  @Column({ default: 0.0 })
  NetWeight: number;

  @Column({ default: 0.0 })
  GrossWeight: number;

  @Column({ default: '' })
  Width: string;

  @Column({ default: '' })
  EPI: string;

  @Column({ default: '' })
  PPI: string;

  @Column({ default: '' })
  InspRemarks: string;

  @Column({ default: '' })
  Plant: string;

  @Column({ default: '' })
  UploadedBy: string;

  @Column({ default: '' })
  UploadedDate: Date;

  @Column({ default: '' })
  UploadedTime: string;

  @Column({ default: '' })
  UploadedReason: string;

  @Column({ default: '' })
  ActiveStatus: number;
}