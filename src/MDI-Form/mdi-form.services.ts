import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DesignationEntity } from 'src/Masters/designation/designation.entity';
import { mastDecisionEntity } from './mast-decision.entity';
import { GroupUserRoleEntity } from 'src/Settings/menu-delegation/entities/user-group-role.entity';

@Injectable()
export class MDIService {
  constructor(
    @InjectRepository(mastDecisionEntity)
    private readonly mastDecisionRepository: Repository<mastDecisionEntity>,
    @InjectRepository(DesignationEntity)
    private readonly mastDesignationRepository: Repository<DesignationEntity>,
    @InjectRepository(GroupUserRoleEntity)
    private readonly GroupUserRoleRepository: Repository<GroupUserRoleEntity>
  ) { }

  async exeadminpath(): Promise<mastDecisionEntity> {
    return this.mastDecisionRepository.findOne({
      select: ['AdminEXE'],
      where: {
        ActiveStatus: 1,
      },
    });
  }

  async ServerAdminPath(): Promise<mastDecisionEntity> {
    return this.mastDecisionRepository.findOne({
      select: ['AdminServerEXE'],
      where: {
        ActiveStatus: 1,
      },
    });

  }

  async DesignationId(designationId: number): Promise<DesignationEntity> {
    const result = await this.mastDesignationRepository
      .createQueryBuilder('MastDesignation')
      .select('MastDesignation.Name AS UserRoleName')
      .where('MastDesignation.DesignationID = :designationId', { designationId })
      .getRawOne();

    return result;
  }

  async dsMenu(userRole: string): Promise<any[]> {
    return this.GroupUserRoleRepository
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