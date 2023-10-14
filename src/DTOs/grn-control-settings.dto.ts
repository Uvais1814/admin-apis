import { IsString, IsNumber } from "class-validator";

export class GrnControlSettingsDTO {
  @IsNumber()
  GrnControlID?: bigint;

  @IsString()
  GrnProduction?: string;

  @IsString()
  GrnControlName?: string;

  @IsString()
  GrnControlDisplayName?: string;

  @IsString()
  GrnControlCodingName?: string;

  @IsNumber()
  ActiveStatus?: number;

  @IsString()
  Plant?: string;
}