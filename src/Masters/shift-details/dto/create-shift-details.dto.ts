import { IsString, IsNumber } from "class-validator";

export class CreateShiftDTO {
  @IsNumber()
  ShiftID: number;

  @IsString()
  Department: string;

  @IsString()
  ShiftName: string;

  @IsString()
  StartTime: string;

  @IsString()
  EndTime: string;

  @IsNumber()
  ActiveStatus: number;

  @IsString()
  Plant: string;
}