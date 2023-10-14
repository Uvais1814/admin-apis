import { Module } from '@nestjs/common';
import { ReInspectionController } from './re-inspection.controller';
import { ReInspectionService } from './re-inspection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from '../delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SortEntity,InspectionMain,GrnEntryEntity])],
  controllers: [ReInspectionController],
  providers: [ReInspectionService]
})
export class ReInspectionModule {}
