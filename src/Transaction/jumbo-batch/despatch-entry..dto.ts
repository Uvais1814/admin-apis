import { IsString, IsNumber } from "class-validator";

export class DespatchEntryDTO {
  @IsNumber()
  DespatchID?: number;

  @IsString()
  JumboBatchNo?: string;

  @IsString()
  RollNo?: string;

  @IsString()
  TotalMeters?: string;

  @IsString()
  Grade?: string;

  @IsString()
  Netwt?: string;

  @IsString()
  GrossWt?: string;

  @IsString()
  TotalPoints?: string;

  @IsString()
  RollWidth?: string;

  @IsString()
  RollLinMtr?: string;

  @IsString()
  RollSqMtr?: string;

  @IsString()
  StdWidth?: string;

  @IsString()
  GrandTotalMeter?: string;

  @IsString()
  GrandNetWt?: string;

  @IsString()
  GrandGrossWt?: string;

  @IsString()
  GrandTotalPoint?: string;

  @IsString()
  GrandSqMtr?: string;

  @IsString()
  GrandLinMtr?: string;

  @IsString()
  EnterByID?: string;

  @IsString()
  EnterByTime?: string;

  @IsString()
  EnterByDate?: Date;

  @IsString()
  StatusInfo?: string;

  @IsNumber()
  ActiveStatus?: number;

  @IsString()
  Plant?: string;

}