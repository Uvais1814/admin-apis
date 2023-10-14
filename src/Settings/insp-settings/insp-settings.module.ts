import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspSettingsController } from './insp-settings.controller';
import { InspSettingsService } from './insp-settings.service';
import { InspSettingsEntity } from './insp-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InspSettingsEntity])],
  controllers: [InspSettingsController],
  providers: [InspSettingsService]
})
export class InspSettingsModule { }
