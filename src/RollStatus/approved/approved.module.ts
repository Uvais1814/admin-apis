import { Module } from '@nestjs/common';
import { ApprovedController } from './approved.controller';
import { ApprovedService } from './approved.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrnEntryEntity } from './entites/grn-entry.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GrnEntryEntity,SortEntity,InspectionMachineEntity])],
  controllers: [ApprovedController],
  providers: [ApprovedService]
})
export class ApprovedModule {}
