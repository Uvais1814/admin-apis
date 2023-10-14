import { Controller, Get, Body, Post, Param, Patch } from '@nestjs/common';
import { ControlSettingsService } from './control-settings.service';
import { ControlSettingsEntity } from './control-settings.entity';
import { ControlSettingsDTO } from './dto/control-settings.dto';

@Controller('control-settings')
export class ControlSettingsController {
  constructor(
    private readonly controlService: ControlSettingsService
  ) { }

  @Get('Dss')
  async getDss(): Promise<ControlSettingsEntity[]> {
    return this.controlService.getControlSettings();
  }

  @Get('Type')
  async getType(): Promise<number> {
    return this.controlService.getType();
  }

  @Get('Size/:size')
  async getSize(@Param('size') size: string): Promise<number> {
    return this.controlService.getSize(size);
  }


  @Get('getConditionalControl')
  async getConditionalControl(): Promise<ControlSettingsEntity[]> {
    return this.controlService.getByCondition();
  }

  @Post('createControlSettings/:controlName')
  async createControlSettings(
    @Param('controlName') controlName: string,
    @Body() updateControls: ControlSettingsDTO): Promise<void> {
    return this.controlService.createByCondition(controlName, updateControls);
  }

  @Patch('updateControl/:controlID')
  async updateControl(
    @Param('controlID') controlID: number,
    @Body() UpdateControl: ControlSettingsDTO,
  ): Promise<ControlSettingsEntity[]> {
    return this.controlService.updateByCondition(controlID, UpdateControl);
  }

  @Patch('ClearControls/:type/:size')
  async ClearControls(
    @Param('type') type: string,
    @Param('size') size: string,
  ): Promise<void> {
    return this.controlService.updateControlSettings(type, size)
  }

  @Patch('deleteControl/:controlID/:activestatus')
  async deleteControl(
    @Param('controlID') controlID: string,
    @Param('activestatus') activestatus: number,
  ): Promise<ControlSettingsEntity[]> {
    return this.controlService.deleteByCondition(controlID, activestatus);
  }

}
