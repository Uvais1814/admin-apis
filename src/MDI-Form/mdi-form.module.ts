import { Module } from '@nestjs/common';
import { MDIController } from './mdi-form.controller';
import { MDIService } from './mdi-form.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mastDecisionEntity } from './mast-decision.entity';
import { DesignationEntity } from 'src/Masters/designation/designation.entity';
import { GroupUserRoleEntity } from 'src/Settings/menu-delegation/entities/user-group-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([mastDecisionEntity, DesignationEntity, GroupUserRoleEntity])],
  controllers: [MDIController],
  providers: [MDIService]

})
export class MDIModule { }