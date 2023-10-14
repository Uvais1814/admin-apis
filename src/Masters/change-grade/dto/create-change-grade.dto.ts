import { IsString, IsNumber } from "class-validator";

export class CreateChangeGradeDTO {
  @IsNumber()
  ChangeID: number;

  @IsString()
  UserGrade: string;

  @IsNumber()
  ActiveStatus: number;

  @IsString()
  Plant: string;
}