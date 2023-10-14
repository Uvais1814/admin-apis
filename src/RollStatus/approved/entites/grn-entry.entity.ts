import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'grnentry' })
export class GrnEntryEntity {
  @PrimaryGeneratedColumn()
  GrnID: number;

  @Column({ default: '' })
  LotNo: string;

  @Column({ default: '' })
  LeftRoll: string;

  @Column({ default: '' })
  RightRoll: string;

  @Column({ default: 0 })
  SortID: number;

  @Column({ default: 0 })
  LoomID: number;

  @Column({ default: 0 })
  WoID: number;

  @Column({ default: 0 })
  DeclareMeter: number;

  @Column({ default: 0 })
  DeclareWeight: number;

  @Column({ default: 0 })
  StatusInfo: number;

  @Column({ default: 0 })
  WeaverID: number;

  @Column({ default: '' })
  SampleRoll: string;

  @Column({ default: 0 })
  ActualMeter: number;

  @Column({ default: 0 })
  ActualWeight: number;

  @Column({ default: '' })
  GrnDate: string;

  @Column({ default: '' })
  WeavedDate: string;

  @Column({ default: '' })
  WeavedShift: string;

  @Column({ default: '' })
  BeamTransNo: string;

  @Column({ default: '' })
  RollSelection: string;

  @Column({ default: '' })
  ByProcess: string;

  @Column({ default: '' })
  ProductionType: string;

  @Column({ default: '' })
  InspectionType: string;

  @Column({ default: 0 })
  VendorID: number;

  @Column({ default: '' })
  SetNo: string;

  @Column({ default: '' })
  Priority: string;

  @Column({ default: 0 })
  FabricTypeID: number;

  @Column({ default: '' })
  internalRollNo: string;

  @Column({ default: '' })
  PackingType: string;

  @Column({ default: 0 })
  Oz: number;

  @Column({ default: '' })
  Plant: string;

  @Column({ default: '' })
  Plant1: string;

  @Column({ default: '' })
  StLoc: string;

  @Column({ default: '' })
  Type: string;

  @Column({ default: '' })
  SupplierLot: string;

  @Column({ default: '' })
  SupplierDcNo: string;

  @Column({ default: '' })
  SupplierDCDt: string;

  @Column({ default: '' })
  InvNo: string;

  @Column({ default: '' })
  InvDt: string;

  @Column({ default: '' })
  NoOfPackage: string;

  @Column({ default: '' })
  SalesOrderNo: string;

  @Column({ default: '' })
  Soline: string;

  @Column({ default: '' })
  PoNo: string;

  @Column({ default: '' })
  PoItem: string;

  @Column({ default: '' })
  PoDate: string;

  @Column({ default: '' })
  VendorCode: string;

  @Column({ default: '' })
  VendorName: string;

  @Column({ default: '' })
  VendorLoomNo: string;

  @Column({ default: '' })
  WorkCenter: string;

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
  MatDescr: string;

  @Column({ default: '' })
  NoOfPanel: string;

  @Column({ default: '' })
  GLM: string;

  @Column({ default: '' })
  GSM: string;

  @Column({ default: '' })
  EPI: string;

  @Column({ default: '' })
  PPI: string;

  @Column({ default: '' })
  Width: string;

  @Column({ default: '' })
  CutLine: string;

  @Column({ default: '' })
  WeaveType: string;

  @Column({ default: '' })
  SelvedgeType: string;

  @Column({ default: '' })
  SelvedgeWeave: string;

  @Column({ default: '' })
  SelvedgeWidth: string;

  @Column({ default: '' })
  Remarks: string;

  @Column({ default: '' })
  UOM: string;

  @Column({ default: '' })
  PieceLength1: string;

  @Column({ default: '' })
  PieceLength2: string;

  @Column({ default: '' })
  PieceLength3: string;

  @Column({ default: '' })
  PieceLength4: string;

  @Column({ default: '' })
  PieceLength5: string;

  @Column({ default: '' })
  MatComposion1: string;

  @Column({ default: '' })
  MatComposion2: string;

  @Column({ default: '' })
  MatComposion3: string;

  @Column({ default: '' })
  MatComposion4: string;

  @Column({ default: '' })
  MatComposion5: string;

  @Column({ default: '' })
  LastWeaverCode: string;

  @Column({ default: '' })
  WeaverName: string;

  @Column({ default: '' })
  DoffDate: string;

  @Column({ default: '' })
  DoffType: string;

  @Column({ default: '' })
  BeamNo1: string;

  @Column({ default: '' })
  BeamNo2: string;

  @Column({ default: '' })
  BeamNo1Mtr: string;

  @Column({ default: '' })
  BeamNo2Mtr: string;

  @Column({ default: '' })
  Mulord: string;

  @Column({ default: '' })
  MaterialDoc: string;

  @Column({ default: '' })
  MaterialDocYear: string;

  @Column({ default: '' })
  Success: string;

  @Column({ default: '' })
  Message: string;

  @Column({ default: '' })
  BarcodeType: string;

  @Column({ default: '' })
  QualityStd: string;

  @Column({ default: '' })
  EnterByID: string;

  @Column({ default: '' })
  GRNType: string;

  @Column({ default: '' })
  CustomerCode: string;

  @Column({ default: '' })
  CustomerName: string;

  @Column({ default: '' })
  Productionorderqty: string;

  @Column({ default: '' })
  Plannedorderqty: string;

  @Column({ default: '' })
  Productiongrnno: string;

  @Column({ default: '' })
  Purchasegrnqty: string;

  @Column({ default: '' })
  Purchaseorderqty: string;

  @Column({ default: '' })
  Purchasegrnno: string;

  @Column({ default: '' })
  Productiongrnqty: string;

  @Column({ default: 0 })
  POTECO: string;

  @Column({ default: 1 })
  ActiveStatus: number;
}