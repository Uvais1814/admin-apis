import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsSettingController } from './points-setting.controller';
import { PointsSettingService } from './points-setting.service';
import { PointsSettingEntity } from './points-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointsSettingEntity])],
  controllers: [PointsSettingController],
  providers: [PointsSettingService]
})
export class PointsSettingModule { }
