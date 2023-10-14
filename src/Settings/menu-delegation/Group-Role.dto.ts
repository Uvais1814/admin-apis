import { IsString,IsNumber } from "class-validator"; 

export class groupRoleDTO{
  @IsNumber()
  GroupID?: number;

  @IsString()
  UserRole?: string;

  @IsString()
  UserID?: string;

  @IsNumber()
  MenuID?: number;

  @IsNumber()
  SubMenuID?: number;

  @IsNumber()
  status?: number;

  @IsString()
  Plant?: string;
}