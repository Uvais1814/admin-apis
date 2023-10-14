import { IsString, IsNumber } from 'class-validator';

export class RawDefectDetailsDTO {
  @IsNumber()
  DeftID: number;

  @IsNumber()
  InspID: number;

  @IsString()
  MachineNo: string;

  @IsString()
  DeftLeftID: string;

  @IsString()
  DeftRightID: string;

  @IsNumber()
  DeftStMeter: number;

  @IsNumber()
  DeftEndMeter: number;

  @IsString()
  RollNo: string;

  @IsString()
  InspectionType: string;

  @IsString()
  PanelInfo: string;

  @IsString()
  DeftDept: string;

  @IsString()
  Department: string;

  @IsString()
  DeftCode: string;

  @IsString()
  DeftName: string;

  @IsNumber()
  DeftPoint: number;

  @IsString()
  DeftRemarks: string;

  @IsString()
  DeftContinuous: string;

  @IsString()
  DeftSerious: string;

  @IsString()
  DeftJoin: string;

  @IsString()
  DeftCuttable: string;

  @IsString()
  DeftWhiteTag: string;

  @IsString()
  DeftRedTag: string;

  @IsString()
  DeftRemark: string;

  @IsString()
  DeftMending: string;

  @IsString()
  DeftMendingTime: string;

  @IsString()
  DeftLogin1: string;

  @IsString()
  DeftLogin2: string;

  @IsString()
  DeftShift: string;

  @IsString()
  DeftDate: string;

  @IsNumber()
  ActiveStatus: number;

  @IsString()
  Plant: string;
}
