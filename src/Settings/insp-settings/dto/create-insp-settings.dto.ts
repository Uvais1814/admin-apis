import { IsString, IsNumber } from "class-validator";

export class CreateInspSettingsDTO {
  @IsNumber()
  settingsID: number;

  @IsString()
  rollavailable: string;

  @IsString()
  rollentrythrough: string;

  @IsString()
  rolldigits: string;

  @IsString()
  rollgenformat: string;

  @IsString()
  epippineeded: string;

  @IsString()
  widthunits: string;

  @IsString()
  weightcall: string;

  @IsString()
  headtailentry: string;

  @IsString()
  netweightentry: string;

  @IsString()
  tareweightentry: string;

  @IsString()
  rollreportprint: string;

  @IsString()
  barcodeprintsize: string;

  @IsString()
  noofinspmc: string;

  @IsString()
  inspapp: string;

  @IsString()
  weaverentry: string;

  @IsNumber()
  activestatus: number;
}