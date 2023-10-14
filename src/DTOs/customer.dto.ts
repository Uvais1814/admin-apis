import { IsString, IsNumber } from "class-validator";

export class CustomerDTO {
  @IsNumber()
  CustomerID?: bigint;

  @IsString()
  CustomerCode?: string;

  @IsString()
  CustomerName?: string;

  @IsString()
  ConsultantPerson?: string;

  @IsString()
  State?: string;

  @IsString()
  City?: string;

  @IsString()
  PhoneNo?: string;

  @IsString()
  Address1?: string;

  @IsString()
  Address2?: string;

  @IsString()
  GST?: string;

  @IsString()
  PAN?: string;

  @IsString()
  Country?: string;

  @IsString()
  Date?: string;

  @IsNumber()
  ActiveStatus?: number;

  @IsString()
  Plant?: string;
}