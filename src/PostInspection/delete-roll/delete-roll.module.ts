import { Module } from '@nestjs/common';
import { DeleteRollController } from './delete-roll.controller';
import { DeleteRollService } from './delete-roll.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMachineController } from 'src/Masters/inspection-machine/inspection-machine.controller';
import { InspectionMain } from './entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { DefectDetailsEntity } from './entities/defect-details.entity';
import { ActualEntryEntity } from './entities/actual-entry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SortEntity,InspectionMain,GrnEntryEntity,DefectDetailsEntity,ActualEntryEntity])],
  controllers: [DeleteRollController],
  providers: [DeleteRollService]
})
export class DeleteRollModule {}
