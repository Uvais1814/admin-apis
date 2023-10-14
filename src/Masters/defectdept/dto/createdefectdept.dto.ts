import { IsString, IsNumber } from "class-validator";

export class CreateDefectDeptDTO {
  @IsNumber()
  DefectDeptID: number;

  @IsNumber()
  FabricTypeID: number;

  @IsString()
  ByProcess: string;

  @IsString()
  Code: string;

  @IsString()
  Name: string;

  @IsString()
  Image: string;

  @IsString()
  EntryDate: string;

  @IsNumber()
  ActiveStatus: number;

  @IsString()
  Plant: string;
}