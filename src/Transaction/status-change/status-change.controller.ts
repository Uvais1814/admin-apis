import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { StatusChangeService } from './status-change.service';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';

@Controller('status-change')
export class StatusChangeController {
  constructor(
    private readonly StatusService: StatusChangeService
  ) { }

  @Get('getMcNo/:plant/:name')
  async getMcNo(
    @Param('plant') plant: string,
    @Param('name') name: string,
  ): Promise<InspectionMachineEntity[]> {
    return this.StatusService.McNo(plant, name);
  }

  @Get('getRollDetailsPending/:plant/:roll?')
  async getRollDetailsPending(
    @Param('plant') plant: string,
    @Param('roll') roll?: string,
  ): Promise<any[]> {
    return this.StatusService.RollDetailPendingForInsp(plant, roll);
  }

  @Get('getRollDetailsInProgress/:plant/:roll?')
  async getRollDetailsInProgress(
    @Param('plant') plant: string,
    @Param('roll') roll?: string,
  ): Promise<any[]> {
    return this.StatusService.RollDetailInprogress(plant, roll);
  }

  @Get('getRollDetailsCompleted/:plant/:roll?')
  async getRollDetailsCompleted(
    @Param('plant') plant: string,
    @Param('roll') roll?: string,
  ): Promise<any[]> {
    return this.StatusService.RollDetailCompleted(plant, roll);
  }

  @Patch('UpdateStatusInfo/:leftroll/:plant')
  async updateStatusWdRoll(
    @Param('leftroll') leftroll: string,
    @Param('plant') plant: string
  ): Promise<GrnEntryEntity[]> {
    return this.StatusService.StatusInfoWdRoll(leftroll, plant);
  }

  @Patch('UpdateStatusInfo1/:leftroll/:plant/:setNo')
  async updateStatusWdMac(
    @Param('leftroll') leftroll: string,
    @Param('plant') plant: string,
    @Param('setNo') setNo: string
  ): Promise<GrnEntryEntity[]> {
    return this.StatusService.StatusInfoWdMac(leftroll, plant, setNo);
  }
}
