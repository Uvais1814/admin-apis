import { IsString, IsNumber } from "class-validator";

export class ControlSettingsDTO {
  @IsNumber()
  ControlID?: number;

  @IsString()
  ControlName?: string;

  @IsString()
  DisplayName?: string;

  @IsString()
  CodingName?: string;

  @IsString()
  Type?: string;

  @IsString()
  Size?: string;

  @IsNumber()
  ActiveStatus?: number;

  @IsString()
  Plant?: string;
}