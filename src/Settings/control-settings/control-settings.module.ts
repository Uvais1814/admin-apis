import { Module } from '@nestjs/common';
import { ControlSettingsController } from './control-settings.controller';
import { ControlSettingsService } from './control-settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlSettingsEntity } from './control-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlSettingsEntity])],
  controllers: [ControlSettingsController],
  providers: [ControlSettingsService]
})
export class ControlSettingsModule {}
