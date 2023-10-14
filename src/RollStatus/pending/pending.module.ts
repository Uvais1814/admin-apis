import { Module } from '@nestjs/common';
import { PendingController } from './pending.controller';
import { PendingService } from './pending.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrnEntryEntity } from '../approved/entites/grn-entry.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GrnEntryEntity,SortEntity,InspectionMachineEntity])],
  controllers: [PendingController],
  providers: [PendingService]
})
export class PendingModule {}
