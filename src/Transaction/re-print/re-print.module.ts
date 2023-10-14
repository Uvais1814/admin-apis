import { Module } from '@nestjs/common';
import { RePrintController } from './re-print.controller';
import { RePrintService } from './re-print.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SortEntity,GrnEntryEntity,InspectionMain])],
  controllers: [RePrintController],
  providers: [RePrintService]
})
export class RePrintModule {}
