import { Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { CompletedService } from './completed.service';

@Controller('completed')
export class CompletedController {
  constructor(
    private readonly CompleteService: CompletedService
  ) { }

  @Get('GRNEntries/:DTPfromDate/:DTPToDate/:Plant/:Qry?')
  async GRNEntries(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry?: string): Promise<any[]> {
    return this.CompleteService.getGrnEntries(DTPfromDate, DTPToDate, Plant, Qry);
  }

  @Get('Sort/:DTPfromDate/:DTPToDate/:Plant')
  async Sort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
  ): Promise<any[]> {
    return this.CompleteService.getSort(DTPfromDate, DTPToDate, Plant);
  }

  @Get('Loom/:DTPfromDate/:DTPToDate/:Plant')
  async Loom(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
  ): Promise<any[]> {
    return this.CompleteService.getLoom(DTPfromDate, DTPToDate, Plant);
  }

  @Get('LoomWithSortID/:DTPfromDate/:DTPToDate/:Plant/:SortID')
  async LoomWithSortID(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.CompleteService.getLoomWithSortID(DTPfromDate, DTPToDate, Plant, SortID);
  }
}
