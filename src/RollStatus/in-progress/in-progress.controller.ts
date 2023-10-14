import { Controller, Get, Post, Param } from '@nestjs/common';
import { InProgressService } from './in-progress.service';

@Controller('in-progress')
export class InProgressController {
  constructor(
    private readonly InProService: InProgressService
  ) { }

  @Get('GRNEntries/:DTPfromDate/:DTPToDate/:Plant/:Qry?')
  async GRNEntries(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry?: string): Promise<any[]> {
    return this.InProService.getGrnEntries(DTPfromDate, DTPToDate, Plant, Qry);
  }

  @Get('Sort/:DTPfromDate/:DTPToDate/:Plant')
  async Sort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
  ): Promise<any[]> {
    return this.InProService.getSort(DTPfromDate, DTPToDate, Plant);
  }

  @Get('Loom/:DTPfromDate/:DTPToDate/:Plant')
  async Loom(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
  ): Promise<any[]> {
    return this.InProService.getLoom(DTPfromDate, DTPToDate, Plant);
  }

  @Get('LoomWithSortID/:DTPfromDate/:DTPToDate/:Plant/:SortID')
  async LoomWithSortID(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPToDate') DTPToDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.InProService.getLoomWithSortID(DTPfromDate, DTPToDate, Plant, SortID);
  }
}
