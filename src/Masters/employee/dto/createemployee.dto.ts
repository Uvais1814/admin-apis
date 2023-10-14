import { IsString, IsNumber } from "class-validator";

export class CreateEmployeeDTO {
  @IsNumber()
  EmpId: number;

  @IsString()
  EmpType: string;

  @IsString()
  EmpContractor: string;

  @IsString()
  EmpCode: string;

  @IsString()
  EmpUser: string;

  @IsString()
  EmpPass: string;

  @IsString()
  EmpName: string;

  @IsString()
  EmpImage: Buffer;

  @IsString()
  EntryDate: string;

  @IsNumber()
  ActiveStatus: number;

  @IsString()
  InspectorType: string;

  @IsString()
  Plant: string;
}