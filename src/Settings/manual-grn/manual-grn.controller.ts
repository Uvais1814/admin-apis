import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ManualGrnService } from './manual-grn.service';
import { ManualGrnEntity } from './manual-grn.entity';
import { ManualGRNDTO } from './dto/maual-grn.dto';

@Controller('manual-grn')
export class ManualGrnController {
  constructor(
    private readonly ManualService: ManualGrnService
  ) { }

  @Get('getManualGrn/:status')
  async getManualGrn(status: number): Promise<ManualGrnEntity[]> {
    return this.ManualService.getByCondition(status);
  }

  @Patch('updateManualGrn/:fields/:status')
  async updateManualGrn(
    @Param('fields') fields: string,
    @Param('status') status: number,
    @Body() updateManualGrn: ManualGRNDTO,
  ): Promise<ManualGrnEntity[]> {
    return this.ManualService.updateByCondition(fields, status, updateManualGrn);
  }

  @Patch('deleteManualGrn/:fields')
  async DeleteManualGRN(@Param('fields') fields: string): Promise<ManualGrnEntity[]> {
    return this.ManualService.DeleteByCondition(fields);
  }
}
