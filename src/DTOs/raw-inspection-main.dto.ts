import { IsString, IsNumber } from 'class-validator';

export class RawInspectionDTO {
  @IsNumber()
  InspID?: bigint;

  @IsString()
  InspLotNo?: string;

  @IsString()
  InspPieceNo?: string;

  @IsString()
  InspSortID?: string;

  @IsString()
  InspGrnID?: string;

  @IsString()
  InspectionType?: string;

  @IsString()
  PanelInfo?: string;

  @IsString()
  InspPartySort?: string;

  @IsNumber()
  InspCustomerID?: number;

  @IsString()
  MachineRollNo?: string;

  @IsString()
  InspStDate?: string;

  @IsString()
  InspStShift?: string;

  @IsString()
  InspStTime?: string;

  @IsNumber()
  InspStMeter?: number;

  @IsString()
  InspEndShift?: string;

  @IsString()
  InspEndTime?: string;

  @IsNumber()
  InspEndMeter?: number;

  @IsString()
  InspEndDate?: string;

  @IsString()
  ActualEndDate?: string;

  @IsNumber()
  InspTotalMeter?: number;

  @IsString()
  Loomno?: string;

  @IsString()
  Vendor?: string;

  @IsNumber()
  InspTotalPoints?: number;

  @IsNumber()
  InspTotalMinor?: number;

  @IsNumber()
  InspTotalMajor?: number;

  @IsString()
  InspTotalCuttable?: string;

  @IsNumber()
  InspNoofDefect?: number;

  @IsNumber()
  InspNoOfMinor?: number;

  @IsNumber()
  InspNoOfMajor?: number;

  @IsNumber()
  InspNoOfCuttable?: number;

  @IsNumber()
  InspNoofCont?: number;

  @IsNumber()
  InspNoofContPoints?: number;

  @IsNumber()
  InspNoofMendable?: number;

  @IsNumber()
  InspNoofMendPoints?: number;

  @IsNumber()
  InspNoofWhiteTag?: number;

  @IsNumber()
  InspWhiteTagPoints?: number;

  @IsNumber()
  InspNoofRedTag?: number;

  @IsNumber()
  InspRedTagPoints?: number;

  @IsNumber()
  InspLinMeter?: number;

  @IsNumber()
  InspSqMeter?: number;

  @IsNumber()
  InspSqYard?: number;

  @IsNumber()
  InspMachineID?: number;

  @IsString()
  InspRemark?: string;

  @IsString()
  ReInspRemark?: string;

  @IsString()
  InspReInspected?: string;

  @IsString()
  InspPauseRemark?: string;

  @IsNumber()
  InspLoginID?: number;

  @IsNumber()
  InspbetDoffTime?: number;

  @IsString()
  InspPauseDuration?: string;

  @IsString()
  InspDuration?: string;

  @IsString()
  InspType?: string;

  @IsString()
  Grade?: string;

  @IsString()
  GradeCode?: string;

  @IsNumber()
  NetWeight?: number;

  @IsNumber()
  GrossWeight?: number;

  @IsNumber()
  NoOfPiece?: number;

  @IsNumber()
  Glm?: number;

  @IsNumber()
  Gsm?: number;

  @IsNumber()
  Ozm?: number;

  @IsNumber()
  Skew?: number;

  @IsNumber()
  NoOfPrint?: number;

  @IsString()
  PackedBy?: string;

  @IsString()
  Contractor?: string;

  @IsString()
  InspPartition?: string;

  @IsNumber()
  WeightVariation?: number;

  @IsString()
  WeightRemark?: string;

  @IsNumber()
  DownGradePoints?: number;

  @IsString()
  DownGradeCode?: string;

  @IsString()
  DownGradeDefect?: string;

  @IsString()
  DownGradeDept?: string;

  @IsNumber()
  DownGradePercentage?: number;

  @IsString()
  ApprovalStatus?: string;

  @IsString()
  RollJoinInfo?: string;

  @IsString()
  ExtraField1?: string;

  @IsString()
  ExtraField2?: string;

  @IsString()
  ExtraField3?: string;

  @IsString()
  ExtraField4?: string;

  @IsString()
  Width?: string;

  @IsString()
  EPI?: string;

  @IsString()
  PPI?: string;

  @IsNumber()
  BaleApproval?: number;

  @IsNumber()
  JumboBatch?: number;

  @IsNumber()
  ActiveStatus?: number;

  @IsString()
  Plant?: string;
}
