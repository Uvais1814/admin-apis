import { Controller, Get, Patch, Param, Query } from '@nestjs/common';
import { PendingService } from './pending.service';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';
import { GrnEntryEntity } from '../approved/entites/grn-entry.entity';

@Controller('pending')
export class PendingController {
  constructor(
    private readonly PenService: PendingService
  ) { }

  @Get('MachineName/:plant/:macName')
  async MachineName(
    @Param('plant') plant: string,
    @Param('macName') macName: string
  ): Promise<InspectionMachineEntity[]> {
    return this.PenService.getMachineName(plant, macName);
  }

  @Get('GRNEntries/:DTPfromDate/:DTPToDate/:Plant/:Qry?')
  async GRNEntries(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry?: string): Promise<any[]> {
    return this.PenService.getGrnEntries(DTPfromDate, DTPToDate, Plant, Qry);
  }

  @Get('Sort/:DTPfromDate/:DTPToDate/:Plant')
  async Sort(
    @Param('DTPfromDate') DTPFromDate: String,
    @Param('DTPToDate') DTPToDate: String,
    @Param('Plant') Plant: String,
  ): Promise<any[]> {
    return this.PenService.getSort(DTPFromDate, DTPToDate, Plant);
  }

  @Get('Loom/:DTPfromDate/:DTPToDate/:Plant')
  async Loom(
    @Param('DTPfromDate') DTPFromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
  ): Promise<any[]> {
    return this.PenService.getLoom(DTPFromDate, DTPToDate, Plant);
  }

  @Get('LoomWithSortID/:DTPfromDate/:DTPToDate/:Plant/:SortID')
  async LoomWithSortID(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.PenService.getLoomWithSortID(DTPfromDate, DTPToDate, Plant, SortID);
  }

  @Get('GRNID/:leftroll/:plant')
  async GRNID(
    @Param('leftroll') leftroll: string[],
    @Param('plant') plant: string
  ): Promise<GrnEntryEntity[]> {
    return this.PenService.getGrnID(leftroll, plant);
  }

  @Patch('GrnEntries/:grnupdate/:priority/:mcno/:inst')
  async GrnEntries(
    @Param('grnupdate') grnupdate: string[],
    @Param('priority') priority: string,
    @Param('mcno') mcno: string,
    @Param('inst') inst: string,
  ): Promise<void> {
    return this.PenService.updateGrnEntries(grnupdate, priority, mcno, inst);
  }

  @Patch('SortEntries/:insertion/:sortid')
  async SortEntries(
    @Param('insertion') insertion: string,
    @Param('sortid') sortid: string,
  ): Promise<void> {
    return this.PenService.updateSortEntries(insertion, sortid);
  }

}
