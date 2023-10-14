import { Module } from '@nestjs/common';
import { ManualEntryController } from './manual-entry.controller';
import { ManualEntryService } from './manual-entry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsSettingEntity } from 'src/Settings/points-setting/points-setting.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { EmployeeEntity } from 'src/Masters/employee/employee.entity';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';
import { DefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/defect-details.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { DefectEntity } from 'src/Masters/defect/defect.entity';
import { ShiftEntity } from 'src/Masters/shift-details/shift-details.entity';
import { GradeSettingsEntity } from 'src/Settings/grade-settings/grade-settings.entity';
import { DefectDeptEntity } from 'src/Masters/defectdept/defectdept.entity';
import { LoomEntity } from 'src/Masters/loom/loom.entity';
import { ActualEntryEntity } from 'src/PostInspection/delete-roll/entities/actual-entry.entity';
import { RawInspectionEntity } from 'src/PostInspection/delete-roll/entities/raw-inspectionmain.entity';
import { RawDefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/raw-defectdetails.entity';
import { FabricTypeEntity } from 'src/Masters/fabric-type/fabric-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointsSettingEntity, InspectionMain, SortEntity, EmployeeEntity, InspectionMachineEntity, DefectDetailsEntity, GrnEntryEntity, DefectEntity, ShiftEntity, GradeSettingsEntity, DefectDeptEntity, LoomEntity, ActualEntryEntity, RawInspectionEntity, RawDefectDetailsEntity, FabricTypeEntity])],
  controllers: [ManualEntryController],
  providers: [ManualEntryService]
})
export class ManualEntryModule { }
