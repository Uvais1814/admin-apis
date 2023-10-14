import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { JumboBatchService } from './jumbo-batch.service';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { DespatchEntryDTO } from './despatch-entry..dto';
import { DespatchEntity } from './entities/despatch-entry.entity';

@Controller('jumbo-batch')
export class JumboBatchController {
  constructor(
    private readonly JumboService: JumboBatchService
  ) { }

  @Get('getDespatch/:plant/:qry?')
  async getDespatch(
    @Param('plant') plant: string,
    @Param('qry') qry?: string,
  ): Promise<InspectionMain[]> {
    return this.JumboService.Despatch(plant, qry);
  }

  @Get('getTxtStWidth/:sortId/:plant')
  async getTxtStWidth(
    @Param('sortId') sortId: number,
    @Param('plant') plant: string
  ): Promise<SortEntity[]> {
    return this.JumboService.TxtStWidth(sortId, plant);
  }

  @Post('Save')
  async InsertSaveJumboEntry(
    @Body() updateJumboEntry: DespatchEntryDTO
  ): Promise<DespatchEntity> {
    return this.JumboService.SaveJumboEntry(updateJumboEntry);
  }

  @Patch('updateFlag/:piece/:plant')
  async updateFlag(
    @Param('piece') piece: string,
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.JumboService.Flag(piece, plant);
  }

  @Get('getJumboBatch/:plant')
  async getJumboBatch(
    @Param('plant') plant: string
  ): Promise<DespatchEntity[]> {
    return this.JumboService.JumboBatch(plant);
  }

  @Get('getSort/:plant')
  async getSort(
    @Param('plant') plant: string
  ): Promise<any[]> {
    return this.JumboService.Sort(plant);
  }
}
