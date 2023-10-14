import { Controller, Get, Patch, Param } from '@nestjs/common';
import { MergeRollService } from './merge-roll.service';

@Controller('merge-roll')
export class MergeRollController {
  constructor(
    private readonly MergeService: MergeRollService
  ) { }

  @Get('GreySort/:DTPfromDate/:DTPtoDate/:Plant')
  async GreySort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.MergeService.getGreySort(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('GreyRoll/:DTPfromDate/:DTPtoDate/:Plant')
  async GreyRoll(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.MergeService.getGreyRoll(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('FinalSort/:DTPfromDate/:DTPtoDate/:Plant')
  async FinalSort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.MergeService.getFinalSort(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('FinalRoll/:DTPfromDate/:DTPtoDate/:Plant')
  async FinalRoll(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.MergeService.getFinalRoll(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('DSSGrey/:DTPfromDate/:DTPtoDate/:Plant/:Qry?')
  async DSSGrey(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry?: string
  ): Promise<any[]> {
    return this.MergeService.getDSSGrey(DTPfromDate, DTPtoDate, Plant, Qry);
  }

  @Get('DSSFinal/:DTPfromDate/:DTPtoDate/:Plant/:Qry')
  async DSSFinal(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry: string
  ): Promise<any[]> {
    return this.MergeService.getDSSFinal(DTPfromDate, DTPtoDate, Plant, Qry);
  }

  @Get('CmbRollGrey/:DTPfromDate/:DTPtoDate/:Plant/:SortID')
  async CmbRollGrey(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.MergeService.getCmbRollGrey(DTPfromDate, DTPtoDate, Plant, SortID);
  }

  @Get('CmbRollFinal/:DTPfromDate/:DTPtoDate/:Plant/:SortID')
  async CmbRollFinal(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.MergeService.getCmbRollFinal(DTPfromDate, DTPtoDate, Plant, SortID);
  }

}
