import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MenuDelegationService } from './menu-delegation.service';
import { GroupUserRoleEntity } from './entities/user-group-role.entity';
import { groupRoleDTO } from './Group-Role.dto';

@Controller('menu-delegation')
export class MenuDelegationController {
  constructor(
    private readonly MenuService: MenuDelegationService
  ) { }

  @Get('/ExecSelectMenuDetails')
  async getUserDetails(): Promise<any[]> {
    return this.MenuService.getdsMenu();
  }

  @Get('/ExecSelectUserName/:plant')
  async getSelectUserName(
    @Param('plant') plant: string
  ): Promise<any[]> {
    return this.MenuService.getUsersByCriteria(plant);
  }

  @Get('getUserRole/:userRole')
  async getUserRole(
    @Param('userRole') userRole: string
  ): Promise<GroupUserRoleEntity[]> {
    return this.MenuService.getGroupRole(userRole);
  }

  @Post('InsertGroupRole')
  async InsertGroupRole(
    @Body() updateData: groupRoleDTO
  ): Promise<GroupUserRoleEntity> {
    return this.MenuService.insertGroupRole(updateData)
  }

  @Delete('deleteGroupUserRole/:userRole/:userID')
  async deleteGroupUserRole(
    @Param('userRole') userRole: string,
    @Param('userID') userID: string,
  ): Promise<void> {
    await this.MenuService.deleteGroupUserRole(userRole, userID);
  }

  @Get('getMenuAppDlg/:userRole')
  async getMenuAppDlg(
    @Param('userRole') userRole: string
  ): Promise<any[]> {
    return this.MenuService.getMenuForAppDlg(userRole);
  }
}
