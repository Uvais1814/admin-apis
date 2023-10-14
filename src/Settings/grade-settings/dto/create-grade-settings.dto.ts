import { IsString, IsNumber, IsDecimal } from "class-validator";

export class GradeSettingsDTO {
  @IsNumber()
  GradeID: number;

  @IsString()
  TypeofFabric?: string;

  @IsString()
  InspectionProcess?: string;

  @IsString()
  ByWidth?: string;

  @IsString()
  NarrowWidthMeter?: string;

  @IsString()
  Customer?: string;

  @IsString()
  internalGrade?: string;

  @IsString()
  MarketGrade?: string;

  @IsString()
  MinLen?: string;

  @IsString()
  MaxLen?: string;

  @IsString()
  TPJoints?: string;

  @IsString()
  Joints?: string;

  @IsString()
  NoOfMajor?: string;

  @IsString()
  SqYrd?: string;

  @IsString()
  SqYrdStatus?: string;

  @IsString()
  SqYrdFrom?: string;

  @IsString()
  SqYrdTo?: string;

  @IsString()
  Continuous?: string;

  @IsString()
  SV?: string;

  @IsString()
  LessWidth?: string;

  @IsString()
  MtrAllowance?: string;

  @IsString()
  AddMajor?: string;

  @IsDecimal()
  MinimumPiece?: number;

  @IsDecimal()
  MinimumRoll?: number;

  @IsDecimal()
  MinLength?: number;

  @IsDecimal()
  MaxLength?: number;

  @IsNumber()
  NoMajor?: number;

  @IsDecimal()
  Minpoints?: number;

  @IsDecimal()
  MaxPoints?: number;

  @IsString()
  Quality?: string;

  @IsDecimal()
  MinSL?: number;

  @IsDecimal()
  MaxSL?: number;

  @IsString()
  SLGrade?: string;

  @IsString()
  MaxFresh?: string;

  @IsNumber()
  EnterById?: number;

  @IsString()
  EnterByDate?: string;

  @IsString()
  MajorConsider?: string;

  @IsNumber()
  ModifiedById?: number;

  @IsString()
  ModifiedByDate?: string;

  @IsString()
  ModifiedReason?: string;

  @IsNumber()
  DeleteById?: number;

  @IsString()
  DeleteByDate?: string;

  @IsString()
  DeleteReason?: string;

  @IsString()
  ApprovalStatus?: string;

  @IsString()
  ExtraField1?: string;

  @IsString()
  ExtraField2?: string;

  @IsString()
  ExtraField3?: string;

  @IsString()
  ExtraField4?: string;

  @IsNumber()
  ActiveStatus?: number;

  @IsString()
  Plant?: string;
}