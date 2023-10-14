import { Module } from '@nestjs/common';
import { GradeSettingsService } from './grade-settings.service';
import { GradeSettingsController } from './grade-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeSettingsEntity } from './grade-settings.entity';
import { FabricTypeEntity } from 'src/Masters/fabric-type/fabric-type.entity';
import { GradeEntity } from 'src/Masters/grade/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GradeSettingsEntity, FabricTypeEntity, GradeEntity])],
  providers: [GradeSettingsService],
  controllers: [GradeSettingsController]
})
export class GradeSettingsModule { }
