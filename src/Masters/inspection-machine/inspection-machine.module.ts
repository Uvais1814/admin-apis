import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionMachineController } from './inspection-machine.controller';
import { InspectionMachineService } from './inspection-machine.service';
import { InspectionMachineEntity } from './inspection-machine.entity';
import { InspectionShedEntity } from '../inspection-shed/inspection-shed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionMachineEntity, InspectionShedEntity])],
  controllers: [InspectionMachineController],
  providers: [InspectionMachineService]
})
export class InspectionMachineModule { }
