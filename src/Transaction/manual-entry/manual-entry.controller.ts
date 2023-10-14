import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';
import { ManualEntryService } from './manual-entry.service';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { retry } from 'rxjs';
import { InspectionDTO } from 'src/DTOs/inspection-main.dto';
import { DefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/defect-details.entity';
import { stat } from 'fs';
import { DefectDetailsDTO } from 'src/DTOs/defect-details.dto';
import { ActualEntryEntity } from 'src/PostInspection/delete-roll/entities/actual-entry.entity';
import { ActualEntryDTO } from 'src/DTOs/actual-entry.dto';
import { RawInspectionDTO } from 'src/DTOs/raw-inspection-main.dto';
import { RawInspectionEntity } from 'src/PostInspection/delete-roll/entities/raw-inspectionmain.entity';
import { RawDefectDetailsDTO } from 'src/DTOs/raw-defect-details.dto';
import { RawDefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/raw-defectdetails.entity';

@Controller('manual-entry')
export class ManualEntryController {
  constructor(
    private readonly ManualService: ManualEntryService
  ) { }

  @Get('/Details')
  async getPointsDetails(): Promise<{ CustomPoints: string; ValueGiven: string }[]> {
    return this.ManualService.PointsDetails();
  }

  @Get('getDsEdit/:piece/:plant')
  async getDsEdit(
    @Param('piece') piece: string,
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.ManualService.dsEdit(piece, plant);
  }

  @Get('getDsEditDefect/:Roll/:plant')
  async getDsEditDefect(
    @Param('Roll') Roll: string,
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.ManualService.dsEditDefect(Roll, plant);
  }

  @Get('getGrnIDs/:RollNo/:plant')
  async getGrnIDs(
    @Param('RollNo') RollNo: string,
    @Param('plant') plant: string
  ): Promise<{ InspGrnID: string }[]> {
    return this.ManualService.GrnIDs(RollNo, plant);
  }

  @Get('getFTID/:GrnId:plantno')
  async getFTID(
    @Param('GrnId') GrnId: bigint,
    @Param('plantno') plantno: string,
  ): Promise<{ FabricTypeID: number }[]> {
    return this.ManualService.FTID(GrnId, plantno);
  }

  @Get('getdsDefect/:fabTypeId')
  async getdsDefect(
    @Param('fabTypeId') fabTypeId: number,
  ): Promise<{ Defect: string, DefectID: number }[]> {
    return this.ManualService.dsDefect(fabTypeId);
  }

  @Get('getdsEdit/:Roll/:plant')
  async getdsEdit(
    @Param('Roll') Roll: string,
    @Param('plant') plant: string,
  ): Promise<InspectionMain[]> {
    return this.ManualService.dsEdit(Roll, plant);
  }

  @Get('getLoomID/:grnid/:plant')
  async getLoomID(
    @Param('grnid') grnid: number,
    @Param('plant') plant: string,
  ): Promise<{ LoomID: number }[]> {
    return this.ManualService.LoomID(grnid, plant);
  }

  @Get('getVendorID/:grnid/:plant')
  async getVendorID(
    @Param('grnid') grnid: number,
    @Param('plant') plant: string,
  ): Promise<{ VendorID: number }[]> {
    return this.ManualService.VendorID(grnid, plant);
  }

  @Get('getEdit/:Roll/:plant')
  async getEdit(
    @Param('Roll') Roll: string,
    @Param('plant') plant: string
  ): Promise<InspectionMain[]> {
    return this.ManualService.Edit(Roll, plant);
  }

  @Get('getCurrentMeter/:pieceno/:plant')
  async getCurrentMeter(
    @Param('pieceno') pieceno: string,
    @Param('plant') plant: string,
  ): Promise<{ InspTotalMeter: number }[]> {
    return this.ManualService.CurrentMeter(pieceno, plant);
  }

  @Get('getCmbMachine/:plant')
  async getCmbMachine(
    @Param('plant') plant: string,
  ): Promise<{ InspectionMachineName: string, InspectionMachineID: number }[]> {
    return this.ManualService.CmbMachine(plant);
  }

  @Get('getOperator/:plant')
  async getOperator(
    @Param('plant') plant: string,
  ): Promise<{ EmpName: string, EmpId: number }[]> {
    return this.ManualService.Operator(plant);
  }

  @Get('getSort/:plant')
  async getSort(
    @Param('plant') plant: string,
  ): Promise<{ SortNo: string, SortId: number }[]> {
    return this.ManualService.Sort(plant);
  }

  @Get('getShift/:plant')
  async getShift(
    @Param('plant') plant: string,
  ): Promise<{ ShiftName: string, ShiftID: number }[]> {
    return this.ManualService.Shift(plant);
  }

  @Get('getPoints')
  async getPoints(
  ): Promise<{ CustomPoints: string, PointsID: number }[]> {
    return this.ManualService.Points();
  }

  @Get('/NFTNames')
  async getFTNames(): Promise<{ Type: string }[]> {
    return this.ManualService.FTNames();
  }

  @Get('getDsGrade/:fabName')
  async getDsGrade(
    @Param('fabName') fabName: string,
  ): Promise<{ InternalGrade: string }[]> {
    return this.ManualService.dsGrade(fabName);
  }

  @Get('getSortwD/:plant/:sortNo?')
  async getSortwD(
    @Param('plant') plant: string,
    @Param('sortNo') sortNo?: string
  ): Promise<{ SortId: number }[]> {
    return this.ManualService.SortwD(plant, sortNo);
  }

  @Get('getDsRollNum/:sortId/:plant')
  async getDsRollNum(
    @Param('sortId') sortId: number,
    @Param('plant') plant: string,
  ): Promise<GrnEntryEntity[]> {
    return this.ManualService.dsRollNum(sortId, plant);
  }

  @Get('getdsLotDetails/:rollNo/:plant')
  async getdsLotDetails(
    @Param('rollNo') rollNo: string,
    @Param('plant') plant: string,
  ): Promise<GrnEntryEntity[]> {
    return this.ManualService.dsLotDetails(rollNo, plant);
  }

  @Get('getGrnWD/:roll/:plant')
  async getGrnWD(
    @Param('roll') roll: string,
    @Param('plant') plant: string,
  ): Promise<{ GrnID: number }[]> {
    return this.ManualService.grnwD(roll, plant);
  }

  @Get('getFTIDs/:grnId/:plant')
  async getFTIDs(
    @Param('grnId') grnId: number,
    @Param('plant') plant: string,
  ): Promise<{ FabricTypeID: number }[]> {
    return this.ManualService.FTIDs(grnId, plant);
  }

  @Get('getFTName/:fabtype')
  async getFTName(
    @Param('fabtype') fabtype: number,
  ): Promise<{ Type: string }[]> {
    return this.ManualService.FTName(fabtype);
  }

  @Get('getDsDefectDetails/:defect')
  async getDsDefectDetails(
    @Param('defect') defect: string,
  ): Promise<{ code: string, DefectDeptId: number }[]> {
    return this.ManualService.dsDefectDetails(defect);
  }

  @Get('getDsDepartDetails/:defectdeptId')
  async getDsDepartDetails(
    @Param('defectdept') defectdeptId: number,
  ): Promise<{ Name: string, Code: string }[]> {
    return this.ManualService.dsDepartDetails(defectdeptId);
  }

  @Get('getLoomWD/:loomId')
  async getLoomWD(
    @Param('loomId') loomId: number,
  ): Promise<{ loomcode: string }[]> {
    return this.ManualService.LoomwD(loomId);
  }

  @Get('getMIDwD/:macName/:plant')
  async getMIDwD(
    @Param('macName') macName: string,
    @Param('plant') plant: string
  ): Promise<{ InspectionMachineID: number }[]> {
    return this.ManualService.MIDwD(macName, plant);
  }

  @Get('/Mpts')
  async getMpts(): Promise<{ ValueGiven: string }[]> {
    return this.ManualService.Mpts();
  }

  @Get('getInspID/:name/:plant')
  async getInspID(
    @Param('name') name: string,
    @Param('plant') plant: string,
  ): Promise<{ EmpId: number }[]> {
    return this.ManualService.InspID(name, plant);
  }

  @Patch('updateInspectionMain/:piece/:plant')
  async updateInspectionMain(
    @Param('piece') piece: string,
    @Param('plant') plant: string,
    @Body() updateInspection: InspectionDTO,
  ): Promise<InspectionMain[]> {
    return this.ManualService.updateInspectionMain(piece, plant, updateInspection);
  }

  @Get('getInspId/:pieceNo/:plant')
  async getInspId(
    @Param('pieceNo') pieceNo: string,
    @Param('plant') plant: string,
  ): Promise<{ InspID: bigint }[]> {
    return this.ManualService.InspId(pieceNo, plant);
  }

  @Patch('updateRollJoinInfo/:inspID/:plant/:rollInfo:')
  async updateRollJoinInfo(
    @Param('inspID') inspID: bigint,
    @Param('plant') plant: string,
    @Param('rollinfo') rollinfo: string,
  ): Promise<InspectionMain[]> {
    return this.ManualService.updateRollJoinInfo(inspID, plant, rollinfo)
  }

  @Patch('updateExtraFields/:inspID/plant/:field')
  async updateExtraFields(
    @Param('inspID') inspID: bigint,
    @Param('plant') plant: string,
    @Param('field') field: string
  ): Promise<InspectionMain[]> {
    return this.ManualService.updateExtraFields(inspID, plant, field)
  }

  @Patch('deleteDefectDetails/:Id/:pl/:status')
  async deleteDefectDetails(
    @Param('Id') Id: number,
    @Param('pl') pl: string,
    @Param('status') status: number
  ): Promise<DefectDetailsEntity[]> {
    return this.ManualService.deleteDefectDetails(Id, pl, status);
  }

  @Post('/Save')
  async createDefectDetails(
    @Body() updateDefect: DefectDetailsDTO,
  ): Promise<DefectDetailsEntity> {
    return this.ManualService.createDefectDetails(updateDefect);
  }

  @Post('/SaveRawDefectDetails')
  async createRawDefectDetails(
    @Body() updateDefect: RawDefectDetailsDTO,
  ): Promise<RawDefectDetailsEntity> {
    return this.ManualService.createRawDefectDetails(updateDefect);
  }

  @Patch('deleteActualEntry/:Id/:pl/:status')
  async deleteActualEntry(
    @Param('Id') Id: string,
    @Param('pl') pl: string,
    @Param('status') status: number
  ): Promise<ActualEntryEntity[]> {
    return this.ManualService.deleteActualEntry(Id, pl, status);
  }

  @Get('getdShade/:roll')
  async getdShade(
    @Param('roll') roll: string,
  ): Promise<ActualEntryEntity[]> {
    return this.ManualService.dShade(roll);
  }

  @Post('/save')
  async createActualEntry(
    @Body() updateActualEntry: ActualEntryDTO,
  ): Promise<ActualEntryEntity> {
    return this.ManualService.createActualEntry(updateActualEntry);
  }

  @Patch('updateExtraField/:pieceNo/:plant')
  async updateExtraField(
    @Param('pieceNo') pieceNo: string,
    @Param('plant') plant: string,
    @Body() updateData: InspectionDTO
  ): Promise<InspectionMain[]> {
    return this.ManualService.updateExtraField(pieceNo, plant, updateData);
  }

  @Patch('deleteInspectionMain/:Roll/:pl/:status')
  async deleteInspectionMain(
    @Param('Roll') Roll: string,
    @Param('pl') pl: string,
    @Param('status') status: number
  ): Promise<InspectionMain[]> {
    return this.ManualService.deleteInspectionMain(Roll, pl, status);
  }

  @Post('createInspectionMain')
  async createInspectionMain(
    @Body() updateData: InspectionDTO,
  ): Promise<InspectionMain> {
    return this.ManualService.createInspectionMain(updateData);
  }

  @Post('createRawInspectionMain')
  async createRawInspectionMain(
    @Body() updateData: RawInspectionDTO,
  ): Promise<RawInspectionEntity> {
    return this.ManualService.createRawInspectionMain(updateData);
  }

  @Patch('updateGrnEntry/:Roll/:status')
  async UpdateGrnEntry(
    @Param('Roll') Roll: string,
    @Param('status') status: number
  ): Promise<GrnEntryEntity[]> {
    return this.ManualService.updateGrnEntry(Roll, status);
  }


  @Get('getOZwD/:sortId/:plant')
  async getOZwD(
    @Param('sortId') sortId: number,
    @Param('plant') plant: string,
  ): Promise<{ OZ: number }[]> {
    return this.ManualService.OZwD(sortId, plant);
  }

} 
