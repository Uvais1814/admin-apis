import { IsString, IsNumber } from "class-validator";

export class PointsSettingDTO {
  @IsNumber()
  PointsID: number;

  @IsString()
  CustomPoints: string;

  @IsString()
  Selection: string;

  @IsString()
  Display: string;

  @IsString()
  ValueGiven: string;

  @IsNumber()
  ActiveStatus: number;

  @IsString()
  Plant: string;
}