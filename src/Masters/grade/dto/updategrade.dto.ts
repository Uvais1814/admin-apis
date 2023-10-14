import { IsString, IsNumber } from "class-validator";

export class UpdateGradeDTO {
  @IsNumber()
  GradeID?: number;

  @IsString()
  GradeCode?: string;

  @IsString()
  GradeName?: string;

  @IsNumber()
  ActiveStatus?: number;

  @IsString()
  Plant?: string;
}