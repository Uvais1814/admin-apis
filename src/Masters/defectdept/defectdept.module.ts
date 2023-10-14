import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefectdeptController } from './defectdept.controller';
import { DefectdeptService } from './defectdept.service';
import { DefectDeptEntity } from './defectdept.entity';
import { FabricTypeEntity } from '../fabric-type/fabric-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DefectDeptEntity, FabricTypeEntity])],
  controllers: [DefectdeptController],
  providers: [DefectdeptService]
})
export class DefectdeptModule { }
