import { Controller, Get, Body, Param, Patch } from '@nestjs/common';
import { CutLookingApprovalService } from './cut-looking-approval.service';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';

@Controller('cut-looking-approval')
export class CutLookingApprovalController {
  constructor(
    private readonly CutLookService: CutLookingApprovalService
  ) { }

  @Patch('getMoveToCutLooking/:roll')
  async getMoveToCutLooking(
    @Param('roll') roll: string,
  ): Promise<void> {
    return this.CutLookService.MoveToCutLooking(roll)
  }

  @Patch('getMoveToSAP/:roll')
  async getMoveToSAP(
    @Param('roll') roll: string,
  ): Promise<void> {
    return this.CutLookService.MoveToSAP(roll)
  }

  @Get('/location')
  async getLocation(): Promise<GrnEntryEntity[]> {
    return this.CutLookService.Location();
  }

  @Get('getDSS/:plant/:qry?')
  async getDSS(
    @Param('plant') plant: string,
    @Param('qry') qry?: string,
  ): Promise<any[]> {
    return this.CutLookService.DSS(plant, qry);
  }

  @Get('getDSS1/:qry')
  async getDSS1(
    @Param('qry') qry: string,
  ): Promise<any[]> {
    return this.CutLookService.DSS1(qry);
  }

  @Get('getDSS2/:qry')
  async getDSS2(
    @Param('qry') qry: string,
  ): Promise<any[]> {
    return this.CutLookService.DSS2(qry);
  }

  @Get('getDSS3/:qry')
  async getDSS3(
    @Param('qry') qry: string,
  ): Promise<any[]> {
    return this.CutLookService.DSS3(qry);
  }
}
