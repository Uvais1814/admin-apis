import { Module } from '@nestjs/common';
import { MenuDelegationController } from './menu-delegation.controller';
import { MenuDelegationService } from './menu-delegation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisplayMenuEntity } from './entities/display-menu.entity';
import { DisplaySubMenuEntity } from './entities/display-submenu.entity';
import { GroupUserRoleEntity } from './entities/user-group-role.entity';
import { DesignationEntity } from 'src/Masters/designation/designation.entity';


@Module({
  imports: [TypeOrmModule.forFeature([DisplayMenuEntity, DisplaySubMenuEntity, GroupUserRoleEntity, DesignationEntity])],
  controllers: [MenuDelegationController],
  providers: [MenuDelegationService]
})
export class MenuDelegationModule { }
