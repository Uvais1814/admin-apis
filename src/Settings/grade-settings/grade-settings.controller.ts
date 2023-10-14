import { Controller, Body, Get, Post, Patch, Param } from '@nestjs/common';
import { GradeSettingsService } from './grade-settings.service';
import { GradeSettingsEntity } from './grade-settings.entity';
import { GradeSettingsDTO } from './dto/create-grade-settings.dto';
import { FabricTypeEntity } from 'src/Masters/fabric-type/fabric-type.entity';
import { GradeEntity } from 'src/Masters/grade/grade.entity';

@Controller('grade-settings')
export class GradeSettingsController {
  constructor(
    private readonly GradeSetService: GradeSettingsService
  ) { }

  @Get('getDSetGrade')
  async getDsetGrade(): Promise<FabricTypeEntity[]> {
    return this.GradeSetService.dSetGrade();
  }

  @Get('getDSetGrade1/:plant')
  async getDsetGrade1(
    @Param('plant') plant: string
  ): Promise<GradeEntity[]> {
    return this.GradeSetService.dSetGrade1(plant);
  }


  @Get('getGradeSettings/:status/:plant')
  async getGradeSettings(
    @Param('status') status: number,
    @Param('plant') plant: string,
  ): Promise<GradeSettingsEntity[]> {
    return this.GradeSetService.findByCondition(status, plant);
  }

  @Post('/save')
  async createGradeSettings(
    @Body() updateGradeSetting: GradeSettingsDTO
  ): Promise<GradeSettingsEntity> {
    return this.GradeSetService.create(updateGradeSetting);
  }

  @Patch('deleteGradeSettings/:FabricType/:InspectionType/:Customer/:status')
  async deleteGradeSettings(
    @Param('FabricType') FabricType: string,
    @Param('InspectionType') InspectionType: string,
    @Param('Customer') Customer: string,
    @Param('status') status: number
  ): Promise<GradeSettingsEntity[]> {
    return this.GradeSetService.deleteByCondition(FabricType, InspectionType, Customer, status);
  }

  @Get('getDsCmbCust/:fab/:InspPro')
  async getDscmbCust(
    @Param('fab') fab: string,
    @Param('InspPro') InspPro: string,
  ): Promise<GradeSettingsEntity[]> {
    return this.GradeSetService.dscmbCust(fab, InspPro);
  }

  @Get('getCheck/:TypeFab/:InspPro/:Cust')
  async getCheck(
    @Param('TypeFab') TypeFab: string,
    @Param('InspPro') InspPro: string,
    @Param('Cust') Cust: string,
  ): Promise<GradeSettingsEntity[]> {
    return this.GradeSetService.check(TypeFab, InspPro, Cust);
  }
}
