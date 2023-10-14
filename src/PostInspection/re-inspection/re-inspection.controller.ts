import { Controller, Get, Patch, Param } from '@nestjs/common';
import { ReInspectionService } from './re-inspection.service';
import { InspectionMain } from '../delete-roll/entities/inspection-main.entity';
import { UpdateResult } from 'typeorm';

@Controller('re-inspection')
export class ReInspectionController {
  constructor(
    private readonly ReService: ReInspectionService
  ) { }

  @Get('GreySort/:DTPfromDate/:DTPtoDate/:Plant')
  async GreySort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.ReService.getGreySort(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('GreyRoll/:DTPfromDate/:DTPtoDate/:Plant')
  async GreyRoll(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.ReService.getGreyRoll(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('FinalSort/:DTPfromDate/:DTPtoDate/:Plant')
  async FinalSort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.ReService.getFinalSort(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('FinalRoll/:DTPfromDate/:DTPtoDate/:Plant')
  async FinalRoll(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.ReService.getFinalRoll(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('CmbRollGrey/:DTPfromDate/:DTPtoDate/:Plant/:SortID')
  async CmbRollGrey(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.ReService.getCmbRollGrey(DTPfromDate, DTPtoDate, Plant, SortID);
  }

  @Get('CmbRollFinal/:DTPfromDate/:DTPtoDate/:Plant/:SortID')
  async CmbRollFinal(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.ReService.getCmbRollFinal(DTPfromDate, DTPtoDate, Plant, SortID);
  }

  @Get('DSSGrey/:DTPfromDate/:DTPtoDate/:Plant/:Qry?')
  async DSSGrey(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry?: string
  ): Promise<any[]> {
    return this.ReService.getDSSGrey(DTPfromDate, DTPtoDate, Plant, Qry);
  }

  @Get('DSSFinal/:DTPfromDate/:DTPtoDate/:Plant/:Qry')
  async DSSFinal(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry: string
  ): Promise<any[]> {
    return this.ReService.getDSSFinal(DTPfromDate, DTPtoDate, Plant, Qry);
  }

  @Patch('InspectionMain/:piece/:plant')
  async InspectionMain(
    @Param('piece') piece: string,
    @Param('plant') plant: string
  ): Promise<InspectionMain[]> {
    return this.ReService.UpdateInspection(piece, plant);
  }

  @Patch('ExtraFields/:username/:currentdate/:piece/:plant')
  async ExtraFields(
    @Param('username') username: string,
    @Param('currentdate') currentdate: string,
    @Param('piece') piece: string,
    @Param('plant') plant: string
  ): Promise<InspectionMain[]> {
    return this.ReService.updateExtrafields(username, currentdate, piece, plant);
  }

}
