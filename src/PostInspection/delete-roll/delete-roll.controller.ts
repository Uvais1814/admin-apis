import { Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { DeleteRollService } from './delete-roll.service';
import { Repository } from 'typeorm';
import { InspectionMain } from './entities/inspection-main.entity';
import { DefectDetailsEntity } from './entities/defect-details.entity';
import { ActualEntryEntity } from './entities/actual-entry.entity';

@Controller('delete-roll')
export class DeleteRollController {
  constructor(
    private readonly DelService: DeleteRollService
  ) { }

  @Get('GreySort/:DTPfromDate/:DTPtoDate/:Plant')
  async GreySort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.DelService.getGreySort(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('GreyRoll/:DTPfromDate/:DTPtoDate/:Plant')
  async GreyRoll(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.DelService.getGreyRoll(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('FinalSort/:DTPfromDate/:DTPtoDate/:Plant')
  async FinalSort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.DelService.getFinalSort(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('FinalRoll/:DTPfromDate/:DTPtoDate/:Plant')
  async FinalRoll(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.DelService.getFinalRoll(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('CmbRollGrey/:DTPfromDate/:DTPtoDate/:Plant/:SortID')
  async CmbRollGrey(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.DelService.getCmbRollGrey(DTPfromDate, DTPtoDate, Plant, SortID);
  }

  @Get('CmbRollFinal/:DTPfromDate/:DTPtoDate/:Plant/:SortID')
  async CmbRollFinal(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.DelService.getCmbRollFinal(DTPfromDate, DTPtoDate, Plant, SortID);
  }

  @Get('DSSGrey/:DTPfromDate/:DTPtoDate/:Plant/:Qry?')
  async DSSGrey(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry?: string
  ): Promise<any[]> {
    return this.DelService.getDSSGrey(DTPfromDate, DTPtoDate, Plant, Qry);
  }

  @Get('DSSFinal/:DTPfromDate/:DTPtoDate/:Plant/:Qry')
  async DSSFinal(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry: string
  ): Promise<any[]> {
    return this.DelService.getDSSFinal(DTPfromDate, DTPtoDate, Plant, Qry);
  }

  @Patch('InspectionMain/:status/:piece/:plant')
  async InspectionMain(
    @Param('status') status: number,
    @Param('piece') piece: string,
    @Param('plant') plant: string
  ): Promise<InspectionMain[]> {
    return this.DelService.updateInspectionMain(status, piece, plant);
  }

  @Patch('DefectDetails/:status/:deftleftid/:plant')
  async DefectDetails(
    @Param('status') status: number,
    @Param('deftleftid') deftleftid: string,
    @Param('plant') plant: string
  ): Promise<DefectDetailsEntity[]> {
    return this.DelService.updateDefectDetails(status, deftleftid, plant);
  }

  @Patch('ActualEntry/:status/:roll/:plant')
  async ActualEntry(
    @Param('status') status: number,
    @Param('roll') roll: string,
    @Param('plant') plant: string
  ): Promise<ActualEntryEntity[]> {
    return this.DelService.updateActualEntry(status, roll, plant);
  }

  @Patch('ExtraFields/:username/:currentdate/:piece/:plant')
  async ExtraFields(
    @Param('username') username: string,
    @Param('currentdate') currentdate: string,
    @Param('piece') piece: string,
    @Param('plant') plant: string
  ): Promise<InspectionMain[]> {
    return this.DelService.updateExrafields(username, currentdate, piece, plant);
  }
}