import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { CutLookingService } from './cut-looking.service';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { InspectionDTO } from 'src/DTOs/inspection-main.dto';
import { DefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/defect-details.entity';
import { ActualEntryEntity } from 'src/PostInspection/delete-roll/entities/actual-entry.entity';

@Controller('cut-looking')
export class CutLookingController {
  constructor(
    private readonly CutLookService: CutLookingService
  ) { }

  @Get('getGrade/:plant')
  async getGrade(
    @Param('plant') plant: string
  ): Promise<{ GradeID: number, GradeName: string }[]> {
    return this.CutLookService.Grade(plant);
  }

  @Get('getSort/:fromDate/:ToDate/:plant')
  async getSort(
    @Param('fromDate') fromDate: string,
    @Param('ToDate') ToDate: string,
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.CutLookService.Sort(fromDate, ToDate, plant);
  }

  @Get('getBatch/:fromDate/:toDate/:plant')
  async getBatch(
    @Param('fromDate') fromDate: string,
    @Param('toDate') toDate: string,
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.CutLookService.Batch(fromDate, toDate, plant);
  }

  @Get('getCmbBatchWdSort/:InspSortId/:plant')
  async getCmbBatchWdSort(
    @Param('InspSortId') InspSortId: number,
    @Param('plant') plant: string
  ): Promise<any[]> {
    return this.CutLookService.CmbBatchWdSort(InspSortId, plant);
  }

  @Get('CmbBatch/:plant')
  async CmbBatch(
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.CutLookService.CmbBatch(plant);
  }

  @Get('getLoadBatch/:roll/:plant')
  async getLoadBatch(
    @Param('roll') roll: string,
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.CutLookService.LoadBatch(roll, plant);
  }

  @Get('getDefect/:roll/:plant')
  async getDefect(
    @Param('roll') roll: string,
    @Param('plant') plant: string
  ): Promise<any[]> {
    return this.CutLookService.Defect(roll, plant);
  }

  @Get('getGrnID/:roll/:plant')
  async getGrnID(
    @Param('roll') roll: string,
    @Param('plant') plant: string,
  ): Promise<{ InspGrnID: string }[]> {
    return this.CutLookService.GrnID(roll, plant);
  }

  @Get('getWidth/:grnid/:plant')
  async getWidth(
    @Param('grnid') grnid: number,
    @Param('plant') plant: string,
  ): Promise<SortEntity[]> {
    return this.CutLookService.Width(grnid, plant)
  }

  @Get('getInspMeters/:roll/:plant')
  async getInspMeters(
    @Param('roll') roll: string,
    @Param('plant') plant: string,
  ): Promise<InspectionMain[]> {
    return this.CutLookService.InspMeters(roll, plant);
  }

  @Get('getDefectDetails/:cmbRollno/:tomtr/:plantno')
  async getDefectDetails(
    @Param('cmbRollno') cmbRollno: string,
    @Param('tomtr') tomtr: number,
    @Param('plantno') plantno: string,
  ): Promise<any[]> {
    return this.CutLookService.DefectDetails(cmbRollno, tomtr, plantno);
  }

  @Get('getdss1/:roll/:plant')
  async getdss1(
    @Param('roll') roll: string,
    @Param('plant') plant: string,
  ): Promise<InspectionMain[]> {
    return this.CutLookService.dss1(roll, plant);
  }

  @Get('getInspID/:Name/:plant')
  async getInspID(
    @Param('Name') Name: string,
    @Param('plant') plant: string,
  ): Promise<{ EmpId: number }[]> {
    return this.CutLookService.InspID(Name, plant);
  }

  @Post('Save')
  async createInspectionMain(
    @Body() updateData: InspectionDTO
  ): Promise<InspectionMain> {
    return this.CutLookService.createInspectionMain(updateData)
  }

  @Get('getInspId/:pieceNo/:plant')
  async getInspId(
    @Param('pieceNo') pieceNo: string,
    @Param('plant') plant: string,
  ): Promise<{ InspID: bigint }[]> {
    return this.CutLookService.InspId(pieceNo, plant);
  }

  @Get('getTotalMeterXY/:pieceNo/:plant')
  async getTotalMeterXY(
    @Param('pieceNo') pieceNo: string,
    @Param('plant') plant: string,
  ): Promise<{ InspTotalMeter: number }[]> {
    return this.CutLookService.TotalMeterXY(pieceNo, plant);
  }

  @Get('getInspDurationZ/:pieceNo/:plant')
  async getInspDurationZ(
    @Param('pieceNo') pieceNo: string,
    @Param('plant') plant: string,
  ): Promise<{ InspDuration: string }[]> {
    return this.CutLookService.InspDurationZ(pieceNo, plant);
  }

  @Patch('updateRollJoinInfo/:Rollinfo/:inspID')
  async updateRollJoinInfo(
    @Param('Rollinfo') Rollinfo: string,
    @Param('inspID') inspID: bigint,
  ): Promise<InspectionMain[]> {
    return this.CutLookService.updateRollJoinInfo(Rollinfo, inspID)
  }

  @Patch('updateInspDuration/:InspDuration/:inspID')
  async updateInspDuration(
    @Param('InspDuration') InspDuration: string,
    @Param('inspID') inspID: bigint,
  ): Promise<InspectionMain[]> {
    return this.CutLookService.updateInspDuration(InspDuration, inspID)
  }

  @Patch('updateDefectDetails/:fromMtr/:toMtr/:CmbRollNo/:plant')
  async updateDefectDetails(
    @Param('fromMtr') fromMtr: number,
    @Param('toMtr') toMtr: number,
    @Param('CmbRollNo') CmbRollNo: string,
    @Param('plant') plant: string,
  ): Promise<void> {
    return this.CutLookService.updateDefectDetails(fromMtr, toMtr, CmbRollNo, plant);
  }

  @Get('getLR/:toMtrVal/:cmbRollno/:plant')
  async getLR(
    @Param('toMtrVal') toMtrVal: number,
    @Param('cmbRollno') cmbRollno: string,
    @Param('plant') plant: string,
  ): Promise<{ DeftLeftID: string }[]> {
    return this.CutLookService.LR(toMtrVal, cmbRollno, plant);
  }

  @Patch('updateInspIDLeft/:inspID/:leftId/:endMeter/:plant')
  async updateInspIDLeft(
    @Param('inspID') inspID: number,
    @Param('leftId') leftId: string,
    @Param('endMeter') endMeter: number,
    @Param('plant') plant: string,
  ): Promise<void> {
    return this.CutLookService.updateInspIDLeft(inspID, leftId, endMeter, plant);
  }

  @Patch('updateInspIDRight/:inspID/:rightId/:endMeter/:plant')
  async updateInspIDRight(
    @Param('inspID') inspID: number,
    @Param('rightId') rightId: string,
    @Param('endMeter') endMeter: number,
    @Param('plant') plant: string,
  ): Promise<void> {
    return this.CutLookService.updateInspIDRight(inspID, rightId, endMeter, plant);
  }

  @Get('getWidthID/:Roll')
  async getWidthID(
    @Param('Roll') Roll: string
  ): Promise<{ AddWidthID: number }[]> {
    return this.CutLookService.widthID(Roll);
  }

  @Get('updateActualEntry/:RollNew/:Roll')
  async updateActualEntry(
    @Param('RollNew') RollNew: string,
    @Param('Roll') Roll: string
  ): Promise<void> {
    return this.CutLookService.updateActualEntry(RollNew, Roll);
  }

  @Post('InsertActualEntryFromWidthId/:widthId')
  async InsertActualEntryFromWidthId(
    @Param('widthId') widthId: string,
  ): Promise<void> {
    return this.CutLookService.insertActualEntryFromWidthId(widthId);
  }

  @Get('getAddWidthID')
  async AddWidthID(): Promise<ActualEntryEntity[]> {
    return this.CutLookService.getAddWidthID();
  }
  @Get('updateActualEntry1/:RollNew/:Id')
  async updateActualEntry1(
    @Param('Id') Id: number,
    @Param('RollNew') RollNew: string
  ): Promise<void> {
    return this.CutLookService.updateActualEntry1(RollNew, Id);
  }

  @Patch('deleteInspectionMain/:Roll/:pl/:activestatus')
  async deleteInspectionMain(
    @Param('Roll') Roll: string,
    @Param('pl') pl: string,
    @Param('activestatus') activestatus: number,
  ): Promise<InspectionMain[]> {
    return this.CutLookService.deleteInspectionMain(Roll, pl, activestatus);
  }

}
