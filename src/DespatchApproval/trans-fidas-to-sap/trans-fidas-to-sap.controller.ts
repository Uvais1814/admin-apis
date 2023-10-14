import { Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { TransFidasToSapService } from './trans-fidas-to-sap.service';
import { SAPUploadedEntity } from '../fidasto-sap/sap-uploaded.entity';

@Controller('trans-fidas-to-sap')
export class TransFidasToSapController {
  constructor(
    private readonly TransService: TransFidasToSapService
  ) { }

  @Get('getSort/:fromDate/:toDate')
  async getSort(
    @Param('fromDate') fromDate: Date,
    @Param('toDate') toDate: Date,
  ): Promise<SAPUploadedEntity[]> {
    return this.TransService.Sort(fromDate, toDate);
  }

  @Get('getPcNoWdSort/:sortNo/:fromDate/:toDate')
  async getPcNoWdSort(
    @Param('sortNo') sortNo: number,
    @Param('fromDate') fromDate: Date,
    @Param('toDate') toDate: Date,
  ): Promise<SAPUploadedEntity[]> {
    return this.TransService.PcNoWdSort(sortNo, fromDate, toDate);
  }

  @Get('getPcNo/:fromDate/:toDate')
  async getPcNo(
    @Param('fromDate') fromDate: Date,
    @Param('toDate') toDate: Date,
  ): Promise<SAPUploadedEntity[]> {
    return this.TransService.PcNo(fromDate, toDate);
  }

  @Get('getDespatchDetails/:fromDate/:toDate/:append?')
  async getDespatchDetails(
    @Param('fromDate') fromDate: string,
    @Param('toDate') toDate: string,
    @Param('append') append?: string,
  ): Promise<SAPUploadedEntity[]> {
    return this.TransService.despatchDetails(fromDate, toDate, append);
  }
}
