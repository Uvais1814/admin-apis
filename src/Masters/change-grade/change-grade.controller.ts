import { Controller, Body, Get, Post, Patch, Param } from '@nestjs/common';
import { ChangeGradeService } from './change-grade.service';
import { ChangeGradeEntity } from './change-grade.entity';
import { CreateChangeGradeDTO } from './dto/create-change-grade.dto';
import { UpdateChangeGradeDTO } from './dto/update-change-grade.dto';

@Controller('change-grade')
export class ChangeGradeController {
  constructor(
    private readonly changeGradeService: ChangeGradeService
  ) { }

  @Get('/dss/:plant')
  async getConditionalChangeGrade(
    @Param('plant') plant: string,
  ): Promise<ChangeGradeEntity[]> {
    return this.changeGradeService.findByCondition(plant);
  }

  @Post('/Save')
  async createChangeGrade(@Body() createChangeGrade: CreateChangeGradeDTO): Promise<void> {
    return this.changeGradeService.createByCondition(createChangeGrade);
  }

  @Patch('updateChangeGrade/:grade/:plant')
  async updateChangeGrade(
    @Param('grade') grade: string,
    @Param('plant') plant: string,
    @Body() UpdateChangeGrade: UpdateChangeGradeDTO,
  ): Promise<ChangeGradeEntity[]> {
    return this.changeGradeService.updateByCondition(grade, plant, UpdateChangeGrade);
  }

  @Patch('deleteChangeGrade/:IDs/:pl/:activestatus')
  async deleteChangeGrade(
    @Param('IDs') IDs: string,
    @Param('pl') pl: string,
    @Param('activestatus') activestatus: number,
  ): Promise<ChangeGradeEntity[]> {
    return this.changeGradeService.deleteByCondition(IDs, pl, activestatus);
  }
}
