import { Controller, Get, Post, Param, Patch, Body } from '@nestjs/common';
import { FidastoSapService } from './fidasto-sap.service';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { SAPUploadedEntity } from './sap-uploaded.entity';
import { SAPUploadedDTO } from './dto/sap-uploaded.dto';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';

@Controller('fidasto-sap')
export class FidastoSapController {
  constructor(
    private readonly FidasService: FidastoSapService
  ) { }

  @Get('location')
  async getLocation(): Promise<GrnEntryEntity[]> {
    return this.FidasService.Location();
  }

  @Get('getSort/:fromDate/:toDate')
  async getSort(
    @Param('fromDate') fromDate: Date,
    @Param('toDate') toDate: Date,
  ): Promise<any[]> {
    return this.FidasService.Sort(fromDate, toDate);
  }

  @Get('getSortWdStatus/:plant')
  async getSortWdStatus(
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.FidasService.SortWdStatus(plant);
  }

  @Get('getGrade/:plant')
  async getGrade(
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.FidasService.Grade(plant);
  }

  @Get('getDespatchDetails/:append?')
  async getDespatchDetails(
    @Param('append') append?: string,
  ): Promise<any[]> {
    return this.FidasService.despatchDetails(append);
  }

  @Get('getDataAvail/:inspId')
  async getDataAvail(
    @Param('inspId') inspId: string,
  ): Promise<SAPUploadedEntity[]> {
    return this.FidasService.dataAvail(inspId);
  }

  @Post('/Save')
  async InsertSAPUploaded(
    @Body() updateDate: SAPUploadedDTO,
  ): Promise<SAPUploadedEntity> {
    return this.FidasService.SAPUploaded(updateDate);
  }

  @Patch('updateSqlQuery/:roll')
  async updateSqlQuery(
    @Param('roll') roll: string
  ): Promise<InspectionMain[]> {
    return this.FidasService.SqlQuery(roll);
  }

  @Get('getRollDefect/:roll')
  async getRollDefect(
    @Param('roll') roll: string
  ): Promise<any[]> {
    return this.FidasService.RollDefect(roll);
  }
}
