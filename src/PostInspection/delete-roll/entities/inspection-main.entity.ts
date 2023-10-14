import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({ name: 'inspectionmain' })

export class InspectionMain {
  @PrimaryGeneratedColumn()
  InspID: bigint;

  @Column({ default: '' })
  InspLotNo: string;

  @Column({ default: '' })
  InspPieceNo: string;

  @Column({ default: '' })
  InspSortID: string;

  @Column({ default: '' })
  InspGrnID: string;

  @Column({ default: '' })
  InspectionType: string;

  @Column({ default: '' })
  PanelInfo: string;

  @Column({ default: '' })
  InspPartySort: string;

  @Column({ default: 0 })
  InspCustomerID: number;

  @Column({ default: '' })
  MachineRollNo: string;

  @Column({ default: '' })
  InspStDate: string;

  @Column({ default: '' })
  InspStShift: string;

  @Column({ default: '' })
  InspStTime: string;

  @Column({ default: 0 })
  InspStMeter: number;

  @Column({ default: '' })
  InspEndShift: string;

  @Column({ default: '' })
  InspEndTime: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  InspEndMeter: number;

  @Column({ default: '' })
  InspEndDate: string;

  @Column({ default: '' })
  ActualEndDate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  InspTotalMeter: number;

  @Column({ default: '' })
  Loomno: string;

  @Column({ default: '' })
  Vendor: string;

  @Column({ default: 0 })
  InspTotalPoint: number;

  @Column({ default: 0 })
  InspTotalMinor: number;

  @Column({ default: 0 })
  InspTotalMajor: number;

  @Column({ default: '' })
  InspTotalCuttable: string;

  @Column({ default: 0 })
  InspNoofDefect: number;

  @Column({ default: 0 })
  InspNoOfMinor: number;

  @Column({ default: 0 })
  InspNoOfMajor: number;

  @Column({ default: 0 })
  InspNoOfCuttable: number;

  @Column({ default: 0 })
  InspNoofCont: number;

  @Column({ default: 0 })
  InspNoofContPoints: number;

  @Column({ default: 0 })
  InspNoofMendable: number;

  @Column({ default: 0 })
  InspNoofMendPoints: number;

  @Column({ default: 0 })
  InspNoofWhiteTag: number;

  @Column({ default: 0 })
  InspWhiteTagPoints: number;

  @Column({ default: 0 })
  InspNoofRedTag: number;

  @Column({ default: 0 })
  InspRedTagPoints: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  InspLinMeter: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  InspSqMeter: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  InspSqYard: number;

  @Column({ default: 0 })
  InspMachineID: number;

  @Column({ default: '' })
  InspRemark: string;

  @Column({ default: '' })
  ReInspRemark: string;

  @Column({ default: '' })
  InspReInspected: string;

  @Column({ default: '' })
  InspPauseRemark: string;

  @Column({ default: 0 })
  InspLoginID: number;

  @Column({ default: 0 })
  InspbetDoffTime: number;

  @Column({ default: '' })
  InspPauseDuration: string;

  @Column({ default: '' })
  InspDuration: string;

  @Column({ default: '' })
  InspType: string;

  @Column({ default: '' })
  Grade: string;

  @Column({ default: '' })
  GradeCode: string;

  @Column({ default: 0 })
  NetWeight: number;

  @Column({ default: 0 })
  GrossWeight: number;

  @Column({ default: 0 })
  NoOfPiece: number;

  @Column({ default: 0 })
  Glm: number;

  @Column({ default: 0 })
  Gsm: number;

  @Column({ default: 0 })
  Ozm: number;

  @Column({ default: 0 })
  Skew: number;

  @Column({ default: 0 })
  NoOfPrint: number;

  @Column({ default: '' })
  PackedBy: string;

  @Column({ default: '' })
  Contractor: string;

  @Column({ default: '' })
  InspPartition: string;

  @Column({ default: 0 })
  WeightVariation: number;

  @Column({ default: '' })
  WeightRemark: string;

  @Column({ default: 0 })
  DownGradePoints: number;

  @Column({ default: '' })
  DownGradeCode: string;

  @Column({ default: '' })
  DownGradeDefect: string;

  // @Column({ default: '' })
  // DownGradeDept: string;

  @Column({ default: 0 })
  DownGradePercentage: number;

  @Column({ default: '' })
  ApprovalStatus: string;

  @Column({ default: '' })
  RollJoinInfo: string;

  @Column({ default: '' })
  ExtraField1: string;

  @Column({ default: '' })
  ExtraField2: string;

  @Column({ default: '' })
  ExtraField3: string;

  @Column({ default: '' })
  ExtraField4: string;

  @Column({ default: '' })
  Width: string;

  @Column({ default: '' })
  EPI: string;

  @Column({ default: '' })
  PPI: string;

  @Column({ default: 0 })
  BaleApproval: number;

  @Column({ default: 0 })
  JumboBatch: number;

  @Column({ default: 0 })
  CutLookStatus: number;

  @Column({ default: 0 })
  PackingListStatus: number;

  @Column({ default: '' })
  PackingListNo: string;

  @Column({ default: 1 })
  ActiveStatus: number;

  @Column({ default: '' })
  Plant: string;
}
