import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefectController } from './defect.controller';
import { DefectService } from './defect.service';
import { DefectEntity } from './defect.entity';
import { DefectDeptEntity } from '../defectdept/defectdept.entity';
import { FabricTypeEntity } from '../fabric-type/fabric-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DefectEntity, DefectDeptEntity, FabricTypeEntity])],
  controllers: [DefectController],
  providers: [DefectService]
})
export class DefectModule { }
