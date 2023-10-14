import { IsString, IsNumber } from "class-validator";

export class ManualGRNDTO {
  @IsNumber()
  id?: number;

  @IsString()
  standardfields?: string;

  @IsString()
  customizedfields?: string;

  @IsString()
  defaultvalue?: string;

  @IsNumber()
  activestatus?: number;
}