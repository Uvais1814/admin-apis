import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ApprovedService } from './approved.service';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';
import { GrnEntryEntity } from './entites/grn-entry.entity';

@Controller('approved')
export class ApprovedController {
  constructor(
    private readonly ApproveService: ApprovedService
  ) { }

  @Get('GRNEntries/:DTPfromDate/:DTPToDate/:Plant/:Qry?')
  async GRNEntries(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry?: string): Promise<any[]> {
    return this.ApproveService.getGrnEntries(DTPfromDate, DTPToDate, Plant, Qry);
  }

  @Get('MachineName/:plant/:macName')
  async MachineName(
    @Param('plant') plant: string,
    @Param('macName') macName: string
  ): Promise<InspectionMachineEntity[]> {
    return this.ApproveService.getMachineName(plant, macName);
  }

  @Get('GRNID/:leftroll/:plant')
  async GRNID(
    @Param('leftroll') leftroll: string[],
    @Param('plant') plant: string
  ): Promise<GrnEntryEntity[]> {
    return this.ApproveService.getGrnID(leftroll, plant);
  }

  @Patch('GrnEntries/:grnupdate/:priority/:mcno/:inst')
  async GrnEntries(
    @Param('grnupdate') grnupdate: string[],
    @Param('priority') priority: string,
    @Param('mcno') mcno: string,
    @Param('inst') inst: string,
  ): Promise<void> {
    return this.ApproveService.updateGrnEntries(grnupdate, priority, mcno, inst);
  }

  @Patch('SortEntries/:insertion/:sortid')
  async SortEntries(
    @Param('insertion') insertion: string,
    @Param('sortid') sortid: string,
  ): Promise<void> {
    return this.ApproveService.updateSortEntries(insertion, sortid);
  }

  @Get('Sort/:DTPfromDate/:DTPToDate/:Plant')
  async Sort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
  ): Promise<any[]> {
    return this.ApproveService.getSort(DTPfromDate, DTPToDate, Plant);
  }

  @Get('Loom/:DTPfromDate/:DTPToDate/:Plant')
  async Loom(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
  ): Promise<any[]> {
    return this.ApproveService.getLoom(DTPfromDate, DTPToDate, Plant);
  }

  @Get('Machine/:DTPfromDate/:DTPToDate/:Plant')
  async Machine(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
  ): Promise<any[]> {
    return this.ApproveService.getMachine(DTPfromDate, DTPToDate, Plant);
  }

  @Get('LoomWithSortID/:DTPfromDate/:DTPToDate/:Plant/:SortID')
  async LoomWithSortID(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.ApproveService.getLoomWithSortID(DTPfromDate, DTPToDate, Plant, SortID);
  }
}
