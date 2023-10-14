import { IsString, IsNumber } from "class-validator";

export class CompanyDTO {
  @IsNumber()
  CompanyID?: number;

  @IsString()
  CompanyName: string;

  @IsString()
  Logo: Buffer;

  @IsString()
  Caption: string;

  @IsString()
  Address: string;

  @IsString()
  TINNo: string;

  @IsString()
  CSTNo: string;

  @IsString()
  Phone: string;

  @IsString()
  Email: string;

  @IsString()
  Website: string;

  @IsNumber()
  ActiveStatus: number;

  @IsString()
  Plant: string;
}