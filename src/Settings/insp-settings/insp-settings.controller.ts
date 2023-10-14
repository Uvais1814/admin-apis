import { Controller, Get, Body, Param, Patch } from '@nestjs/common';
import { InspSettingsService } from './insp-settings.service';
import { InspSettingsEntity } from './insp-settings.entity';
import { UpdateInspSettingsDTO } from './dto/update-insp-settings.dto';

@Controller('insp-settings')
export class InspSettingsController {
  constructor(
    private readonly InspService: InspSettingsService
  ) { }

  @Get('getConditionalInspSetting')
  async getConditionalInspSetting(): Promise<InspSettingsEntity[]> {
    return this.InspService.getByCondition();
  }


  @Patch('updateInspSettings')
  async updateInspSettings(
    @Body() updateInspSetting: UpdateInspSettingsDTO,
  ): Promise<InspSettingsEntity[]> {
    return this.InspService.updateByCondition(updateInspSetting);
  }
}
