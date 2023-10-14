import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { GrnControlSettingsService } from './grn-control-settings.service';
import { MastGrnSettingsEntity } from 'src/Entities/mast-grn.entity';
import { GrnProductionSettingEntity } from 'src/Entities/grn-production-settings.entity';
import { GrnControlSettingsEntity } from 'src/Entities/grn-control-settings.entity';
import { GrnControlSettingsDTO } from 'src/DTOs/grn-control-settings.dto';

@Controller('grn-control-settings')
export class GrnControlSettingsController {
  constructor(
    private readonly GrnCtrlSetService: GrnControlSettingsService
  ) { }

  @Get('LoadControlName')
  async getControlName(): Promise<MastGrnSettingsEntity[]> {
    return this.GrnCtrlSetService.ControlName();
  }

  @Get('LoadProdType')
  async getProductionType(): Promise<GrnProductionSettingEntity[]> {
    return this.GrnCtrlSetService.ProductionType();
  }

  @Get('LoadDSS')
  async getDss(): Promise<GrnControlSettingsEntity[]> {
    return this.GrnCtrlSetService.DSS();
  }

  @Post('SaveControlSettings')
  async createByCondition(
    @Body() InsertCtrSettings: GrnControlSettingsDTO
  ): Promise<void> {
    return this.GrnCtrlSetService.createByCondition(InsertCtrSettings);
  }

  @Patch('UpdateControlSettings/:contID')
  async updateByCondition(
    @Param('contID') contID: bigint,
    @Body() UpdateCtrlSettings: GrnControlSettingsDTO
  ): Promise<void> {
    return this.GrnCtrlSetService.updateByCondition(contID, UpdateCtrlSettings)
  }

}
