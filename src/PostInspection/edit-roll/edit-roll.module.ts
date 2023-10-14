import { Module } from '@nestjs/common';
import { EditRollController } from './edit-roll.controller';
import { EditRollService } from './edit-roll.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from '../delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { ActualEntryEntity } from '../delete-roll/entities/actual-entry.entity';
import { DefectDetailsEntity } from '../delete-roll/entities/defect-details.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SortEntity,InspectionMain,GrnEntryEntity,DefectDetailsEntity,ActualEntryEntity])],
  controllers: [EditRollController],
  providers: [EditRollService]
})
export class EditRollModule {}
