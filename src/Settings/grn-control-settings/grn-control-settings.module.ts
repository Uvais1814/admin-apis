import { Module } from '@nestjs/common';
import { GrnControlSettingsController } from './grn-control-settings.controller';
import { GrnControlSettingsService } from './grn-control-settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MastGrnSettingsEntity } from 'src/Entities/mast-grn.entity';
import { GrnProductionSettingEntity } from 'src/Entities/grn-production-settings.entity';
import { GrnControlSettingsEntity } from 'src/Entities/grn-control-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MastGrnSettingsEntity, GrnProductionSettingEntity, GrnControlSettingsEntity])],
  controllers: [GrnControlSettingsController],
  providers: [GrnControlSettingsService]
})
export class GrnControlSettingsModule { }
