import { Module } from '@nestjs/common';
import { MergeRollController } from './merge-roll.controller';
import { MergeRollService } from './merge-roll.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from '../delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { DefectDetailsEntity } from '../delete-roll/entities/defect-details.entity';
import { ActualEntryEntity } from '../delete-roll/entities/actual-entry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SortEntity,InspectionMain,GrnEntryEntity,DefectDetailsEntity,ActualEntryEntity])],
  controllers: [MergeRollController],
  providers: [MergeRollService]
})
export class MergeRollModule {}
