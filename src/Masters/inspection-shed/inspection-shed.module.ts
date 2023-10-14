import { Module } from '@nestjs/common';
import { InspectionShedController } from './inspection-shed.controller';
import { InspectionShedService } from './inspection-shed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionShedEntity } from './inspection-shed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionShedEntity])],
  controllers: [InspectionShedController],
  providers: [InspectionShedService]
})
export class InspectionShedModule { }
