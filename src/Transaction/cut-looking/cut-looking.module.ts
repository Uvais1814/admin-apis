import { Module } from '@nestjs/common';
import { CutLookingController } from './cut-looking.controller';
import { CutLookingService } from './cut-looking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from 'src/Masters/grade/grade.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { DefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/defect-details.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { EmployeeEntity } from 'src/Masters/employee/employee.entity';
import { ActualEntryEntity } from 'src/PostInspection/delete-roll/entities/actual-entry.entity';


@Module({
  imports:[TypeOrmModule.forFeature([GradeEntity,InspectionMain,DefectDetailsEntity,GrnEntryEntity,SortEntity,EmployeeEntity,ActualEntryEntity])],
  controllers: [CutLookingController],
  providers: [CutLookingService]
})
export class CutLookingModule {}
