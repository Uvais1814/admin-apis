import { IsString, IsNumber } from "class-validator";

export class SAPUploadedDTO {
  @IsNumber()
  Tans_ID?: number;

  @IsString()
  InspID?: string;

  @IsString()
  ConfNo?: string;

  @IsString()
  ParentRoll?: string;

  @IsString()
  RollNo?: string;

  @IsString()
  StLoc?: string;

  @IsString()
  SupplierDCNo?: string;

  @IsString()
  InvNo?: string;

  @IsString()
  SalesOrderNo?: string;

  @IsString()
  Soline?: string;

  @IsString()
  PoNo?: string;

  @IsString()
  Po_Item?: string;

  @IsString()
  WorkCenter?: string;

  @IsString()
  Vendor_Code?: string;

  @IsString()
  VendorName?: string;

  @IsString()
  ProdOrder?: string;

  @IsString()
  OperationCode?: string;

  @IsString()
  OperationName?: string;

  @IsString()
  SortNo?: string;

  @IsString()
  Material?: string;

  @IsString()
  MatDescription?: string;

  @IsString()
  BeamNo1?: string;

  @IsString()
  MaterialDoc?: string;

  @IsString()
  INSPDate?: Date;

  @IsString()
  Shift?: string;

  @IsNumber()
  InspTotalMeter?: number;

  @IsNumber()
  InspTotalPoint?: number;

  @IsNumber()
  InspNoofDefect?: number;

  @IsNumber()
  SqMtr?: number;

  @IsNumber()
  InspSqYard?: number;

  @IsNumber()
  InspLinMeter?: number;

  @IsString()
  InspMachCode?: string;

  @IsString()
  InspMachine?: string;

  @IsString()
  EmpCode?: string;

  @IsString()
  Inspector?: string;

  @IsString()
  InsDuration?: string;

  @IsString()
  Grade?: string;

  @IsString()
  NoOfPiece?: string;

  @IsNumber()
  NetWeight?: number;

  @IsNumber()
  GrossWeight?: number;

  @IsString()
  Width?: string;

  @IsString()
  EPI?: string;

  @IsString()
  PPI?: string;

  @IsString()
  InspRemarks?: string;

  @IsString()
  Plant?: string;

  @IsString()
  UploadedBy?: string;

  @IsString()
  UploadedDate?: Date;

  @IsString()
  UploadedTime?: string;

  @IsString()
  UploadedReason?: string;

  @IsNumber()
  ActiveStatus?: number;
}