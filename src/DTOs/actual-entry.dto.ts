import { IsString, IsNumber, IsDate } from "class-validator";

export class ActualEntryDTO {
  @IsNumber()
  AddWidthID?: number;

  @IsString()
  EPI?: string;

  @IsString()
  PPI?: string;

  @IsString()
  Width?: string;

  @IsString()
  CutLineEntry?: string;

  @IsString()
  SatinBandA?: string;

  @IsString()
  SatinBandB?: string;

  @IsString()
  SatinBandC?: string;

  @IsString()
  SatinBandD?: string;

  @IsString()
  SatinBandE?: string;

  @IsString()
  SatinBandF?: string;

  @IsString()
  RollNo?: string;

  @IsString()
  InspectionType?: string;

  @IsString()
  PanelInfo?: string;

  @IsNumber()
  Meter?: number;

  @IsDate()
  EntryDate?: string;

  @IsNumber()
  Activestatus?: number;

  @IsString()
  Plant?: string;
}