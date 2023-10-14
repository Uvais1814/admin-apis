import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { PointsSettingService } from './points-setting.service';
import { PointsSettingEntity } from './points-setting.entity';
import { UpdatePointsSettingDTO } from './dto/update-points-setting.dto';

@Controller('points-setting')
export class PointsSettingController {

  constructor(
    private readonly pointsService: PointsSettingService
  ) { }

  @Get('getConditionalPointsSet/:status')
  async getConditionalPointsSet(
    @Param('status') status: number,
  ): Promise<PointsSettingEntity[]> {
    return this.pointsService.findByCondition(status);
  }

  @Get('getDSS/:status')
  async getDSS(@Param('status') status: number): Promise<PointsSettingEntity[]> {
    return this.pointsService.findAll(status);
  }


  @Post('Save')
  async createPointsSetting(@Body() updatePoints: UpdatePointsSettingDTO): Promise<string> {
    return this.pointsService.createByCondition(updatePoints);
  }

  @Patch('UpdatePoints/:pointsID')
  async updatePoints(
    @Param('pointsID') pointsID: number,
    @Body() UpdatePoints: UpdatePointsSettingDTO,
  ): Promise<PointsSettingEntity[]> {
    return this.pointsService.updateByCondition(pointsID, UpdatePoints);
  }

  @Patch('deletePoints/:pointsID')
  async deleteCompany(
    @Param('pointsID') pointsID: number,
  ): Promise<PointsSettingEntity[]> {
    return this.pointsService.deleteByCondition(pointsID);
  }
}