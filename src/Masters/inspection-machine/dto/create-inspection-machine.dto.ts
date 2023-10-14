import { IsString, IsNumber } from "class-validator";

export class CreateMachineDTO {
  @IsNumber()
  InspectionMachineID: number;

  @IsNumber()
  InspectionShedID: number;

  @IsString()
  InspectionType: string;

  @IsString()
  InspectionMachineCode: string;

  @IsString()
  InspectionMachineName: string;

  @IsNumber()
  ActiveStatus: number;

  @IsNumber()
  Date: string;

  @IsNumber()
  ConfigNo: number;

  @IsNumber()
  WheelCircum: number;

  @IsNumber()
  PulsePerRotation: number;

  @IsNumber()
  IPScale: number;

  @IsNumber()
  DisplayResolution: number;

  @IsString()
  Comport: string;

  @IsString()
  ResetTo: string;

  @IsString()
  PrinterShareName: string;

  @IsString()
  MachineType: string;

  @IsString()
  Plant: string;
}