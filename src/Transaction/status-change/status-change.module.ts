import { Module } from '@nestjs/common';
import { StatusChangeController } from './status-change.controller';
import { StatusChangeService } from './status-change.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionMachineController } from 'src/Masters/inspection-machine/inspection-machine.controller';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InspectionMachineEntity,GrnEntryEntity])],
  controllers: [StatusChangeController],
  providers: [StatusChangeService]
})
export class StatusChangeModule {}
