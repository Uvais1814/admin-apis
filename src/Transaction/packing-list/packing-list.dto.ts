import { IsString, IsNumber } from "class-validator";

export class PackingListDTO {
  @IsNumber()
  PL_ID?: number;

  @IsString()
  PL_No?: string;

  @IsString()
  Wo_No?: string;

  @IsString()
  So_No?: string;

  @IsString()
  Customer_Name?: string;

  @IsString()
  SortNo?: string;

  @IsString()
  No_of_rolls?: string;

  @IsString()
  Entry_by_ID?: string;

  @IsString()
  TotalMeter?: string;

  @IsString()
  Total_GWT?: string;

  @IsString()
  Total_NWT?: string;

  @IsString()
  Total_Deft_Points?: string;

  @IsString()
  Total_sq_mtr?: string;

  @IsString()
  Total_sq_yard?: string;

  @IsString()
  Total_lin_meter?: string;

  @IsString()
  Entry_Time?: string;

  @IsString()
  Entry_Date?: string;

  @IsNumber()
  Delivery_Status?: number;

  @IsNumber()
  ActiveStatus?: number;

  @IsString()
  Delete_by_ID?: string;

  @IsString()
  Delete_by_Date?: string;

  @IsString()
  Delete_by_Time?: string;

  @IsString()
  EXF1?: string;

  @IsString()
  EXF2?: string;

  @IsString()
  EXF3?: string;

  @IsString()
  EXF4?: string;
}