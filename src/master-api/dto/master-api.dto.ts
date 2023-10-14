import { IsString, IsNumber } from "class-validator";

export class MasterAPIDTO {
  @IsNumber()
  API_ID?: number;

  @IsString()
  Forms?: string;

  @IsString()
  API_No?: string;

  @IsString()
  Host?: string;

  @IsString()
  Address?: string;

  @IsString()
  Query_Type?: string;

  @IsString()
  Username?: string;

  @IsString()
  Password?: string;

  @IsString()
  EF1?: string;

  @IsString()
  EF2?: string;

  @IsString()
  EF3?: string;

  @IsString()
  EF4?: string;
}