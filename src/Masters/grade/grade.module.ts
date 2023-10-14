import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { GradeEntity } from './grade.entity';
import { FabricTypeEntity } from '../fabric-type/fabric-type.entity';
import { GradeSettingsEntity } from 'src/Settings/grade-settings/grade-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity, FabricTypeEntity, GradeSettingsEntity])],
  controllers: [GradeController],
  providers: [GradeService]
})
export class GradeModule { }
