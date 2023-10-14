import { IsString, IsNumber } from "class-validator";

export class CreateDefectDTO {
  @IsNumber()
  DefectId: number;

  @IsNumber()
  DefectDeptId: number;

  @IsNumber()
  FabricTypeId: number;

  @IsString()
  Code: string;

  @IsString()
  Defect: string;

  @IsString()
  DefectType: string;

  @IsString()
  ByProcess: string;

  @IsString()
  Seriousness: string;

  @IsString()
  Image: string;

  @IsString()
  Points: string;

  @IsString()
  EntryDate: string;

  @IsString()
  Category: string;

  @IsNumber()
  Man: number;

  @IsNumber()
  Machine: number;

  @IsNumber()
  Material: number;

  @IsNumber()
  ActiveStatus: number;

  @IsString()
  Plant: string;
}