import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisplayMenuEntity } from './entities/display-menu.entity';
import { DisplaySubMenuEntity } from './entities/display-submenu.entity';
import { GroupUserRoleEntity } from './entities/user-group-role.entity';
import { groupRoleDTO } from './Group-Role.dto';
import { DesignationEntity } from 'src/Masters/designation/designation.entity';

@Injectable()
export class MenuDelegationService {
  constructor(
    @InjectRepository(DisplayMenuEntity)
    private readonly DisplayMenuRepo: Repository<DisplayMenuEntity>,
    @InjectRepository(DisplaySubMenuEntity)
    private readonly DisplaySubRepo: Repository<DisplaySubMenuEntity>,
    @InjectRepository(GroupUserRoleEntity)
    private readonly GroupUserRepo: Repository<GroupUserRoleEntity>,
    @InjectRepository(DesignationEntity)
    private readonly DesignationRepo: Repository<DesignationEntity>
  ) { }

  async getdsMenu(): Promise<any[]> {
    return this.DisplayMenuRepo
      .createQueryBuilder('MM')
      .select('MM.MenuName, MS.SubMenuName, MM.MenuDispName, MS.SubMenuDispName, MM.MenuID, MS.SubMenuID')
      .innerJoin('MasterDispSubMenu', 'MS', 'MM.MenuID = MS.MenuID')
      .where('MS.status <>0')
      .andWhere('MM.status<>0')
      .orderBy('MS.SubMenuID,MM.MenuID')
      .getRawMany();
  }

  async getUsersByCriteria(p_Plant: string): Promise<any[]> {
    const users = await this.DesignationRepo
      .createQueryBuilder('MR')
      .select([
        'MR.DesignationID As UserRoleID',
        'MR.Name As UserRoleName',
        'SI.EmpId As ID',
        'SI.EmpName As UserName',
        'SI.EmpPass As Password',
        'SI.EmpId As StaffID',
      ])
      .innerJoin('MastEmployee', 'SI', 'SI.EmpType = MR.DesignationID')
      .where('SI.ActiveStatus = :activeStatus', { activeStatus: '1' })
      .andWhere('SI.Plant = :plant', { plant: p_Plant })
      .andWhere("SI.EmpName <> 'SUPER ADMIN'")
      .getRawMany();

    return users
  }
  async getGroupRole(userRole: string): Promise<GroupUserRoleEntity[]> {
    return this.GroupUserRepo.find({
      select: ['UserRole'],
      where: {
        UserRole: userRole,
      }
    });
  }

  async insertGroupRole(updateData: groupRoleDTO): Promise<GroupUserRoleEntity> {
    const groupRole = this.GroupUserRepo.create(updateData)
    await this.GroupUserRepo.save(groupRole)
    return groupRole;
  }

  async deleteGroupUserRole(userRole: string, userID: string): Promise<void> {
    const deleteResult = await this.GroupUserRepo.delete({
      UserRole: userRole,
      UserID: userID,
    });
  }

  async getMenuForAppDlg(userRole: string): Promise<any[]> {
    return this.GroupUserRepo
      .createQueryBuilder('MU')
      .select('MU.UserRole, MM.MenuName, MS.SubMenuName, MM.MenuDispName, MS.SubMenuDispName, MU.MenuID, MU.SubMenuID')
      .innerJoin('MasterDispSubMenu', 'MS', 'MU.SubMenuID = MS.SubMenuID')
      .innerJoin('MasterDispMenu', 'MM', 'MU.MenuID = MM.MenuID')
      .leftJoin('MastEmployee', 'ME', 'ME.EmpId = MU.UserID')
      .where('MU.Status <>0')
      .andWhere('ME.EmpId=:user', { user: userRole })
      .getRawMany();
  }
}
