import { IsString, IsNumber } from "class-validator";

export class FileLocationDTO {
  @IsNumber()
  FID?: number;

  @IsString()
  MastInput?: string;

  @IsString()
  InputFile?: string;

  @IsString()
  OutputFile?: string;

  @IsString()
  ReportFile?: string;

  @IsString()
  AdminServerExe?: string;

  @IsString()
  InspServerExe?: string;

  @IsString()
  InspServerExeFinal?: string;

  @IsString()
  ReportServerExe?: string;

  @IsString()
  AdminInstalledPath?: string;

  @IsString()
  InspInstalledPath?: string;

  @IsString()
  InspInstalledPathFinal?: string;

  @IsString()
  ReportInstalledPath?: string;

  @IsNumber()
  ActiveStatus?: number;

  @IsString()
  Plant?: string;
}