import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { RePrintService } from './re-print.service';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';

@Controller('re-print')
export class RePrintController {
  constructor(
    private readonly ReService: RePrintService
  ) { }

  @Get('getSort/:fromDate/:toDate/:plant')
  async getSort(
    @Param('fromDate') fromDate: Date,
    @Param('toDate') toDate: Date,
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.ReService.Sort(fromDate, toDate, plant);
  }

  @Get('getLoadDetails/:fromDate/:toDate/:plant/:query?')
  async getLoadDetails(
    @Param('fromDate') fromDate: Date,
    @Param('toDate') toDate: Date,
    @Param('plant') plant: string,
    @Param('query') query?: string
  ): Promise<any[]> {
    return this.ReService.LoadDetails(fromDate, toDate, plant, query);
  }

  @Patch('updateNetWeight/:netwt/:grosswt/:extrafield/:piece/:plant')
  async updateNetWeight(
    @Param('netwt') netwt: number,
    @Param('grosswt') grosswt: number,
    @Param('extrafield') extrafield: string,
    @Param('piece') piece: string,
    @Param('plant') plant: string,
  ): Promise<InspectionMain[]> {
    return this.ReService.NetWeight(netwt, grosswt, extrafield, piece, plant);
  }

  @Get('getBatchWdSort/:sortID/:plant')
  async getBatchWdSort(
    @Param('sortID') sortID: number,
    @Param('plant') plant: string
  ): Promise<InspectionMain[]> {
    return this.ReService.BatchWdSort(sortID, plant);
  }

  @Get('getBatch/:plant')
  async getBatch(
    @Param('plant') plant: string
  ): Promise<InspectionMain[]> {
    return this.ReService.Batch(plant);
  }
}
