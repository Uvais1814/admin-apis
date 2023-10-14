import { Controller, Get, Param } from '@nestjs/common';
import { MasterApiService } from './master-api.service';
import { MasterAPIEntity } from './master-api.entity';

@Controller('master-api')
export class MasterApiController {
  constructor(
    private readonly apiService: MasterApiService,
  ) { }

  @Get('HostName')
  async HostName(): Promise<string> {
    return this.apiService.getHostName();
  }

  @Get('GetAddress/:forms/:apis')
  async getAddress(
    @Param('forms') forms: string,
    @Param('apis') apis: string
  ): Promise<string> {
    return this.apiService.getHostAddress(forms, apis);
  }
}
