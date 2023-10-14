import { Module } from '@nestjs/common';
import { FidastoSapController } from './fidasto-sap.controller';
import { FidastoSapService } from './fidasto-sap.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { GradeEntity } from 'src/Masters/grade/grade.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { SAPUploadedEntity } from './sap-uploaded.entity';
import { DefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/defect-details.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GrnEntryEntity,SortEntity,GradeEntity,InspectionMain,SAPUploadedEntity,DefectDetailsEntity])],
  controllers: [FidastoSapController],
  providers: [FidastoSapService]
})
export class FidastoSapModule {}
