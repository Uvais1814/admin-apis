import { Controller, Post, Body, Patch, Get, Param } from '@nestjs/common';
import { DefectService } from './defect.service';
import { CreateDefectDTO } from './dto/createdefect.dto';
import { UpdateDefectDTO } from './dto/updatedefect.dto';
import { FabricTypeEntity } from '../fabric-type/fabric-type.entity';
import { DefectDeptEntity } from '../defectdept/defectdept.entity';
import { DefectEntity } from './defect.entity';

@Controller('defect')
export class DefectController {
  constructor(
    private readonly defectService: DefectService
  ) { }

  @Get('getConditionalDefects/:status/:plant')
  async getConditionalDefects(
    @Param('status') status: number,
    @Param('plant') plant: string,
  ): Promise<DefectEntity[]> {
    return this.defectService.findByCondition(status, plant);
  }

  @Get('getInsideQuery1/:type/:process')
  async getInsideQuery1(
    @Param('type') type: string,
    @Param('process') process: string): Promise<number> {
    return this.defectService.getByCustomQuery(type, process)
  }

  @Get('getDepartmentColumns/:FabID')
  async getDepartmentColumns(@Param('FabID') FabID: number): Promise<DefectDeptEntity[]> {
    return this.defectService.getDefectDept(FabID);
  }

  @Get('/fabricType')
  async getInsideQuery(): Promise<FabricTypeEntity[]> {
    return this.defectService.getFabricType();
  }

  @Get('Details/:activestatus')
  async getInsideJoinQuery(@Param('activestatus') activestatus: number): Promise<any[]> {
    return this.defectService.getDefectsWithDetails(activestatus);
  }

  @Post('/Save')
  async createDefect(@Body() createdefect: CreateDefectDTO): Promise<void> {
    return this.defectService.createByCondition(createdefect);
  }

  @Patch('updateDefect/:DefectID/:plant')
  async updateDefect(
    @Param('DefectID') DefectID: number,
    @Param('plant') plant: string,
    @Body() UpdateDefect: UpdateDefectDTO,
  ): Promise<DefectEntity[]> {
    return this.defectService.updateByCondition(DefectID, plant, UpdateDefect);
  }

  @Patch('deleteDefect/:ID/:pl/:activestatus')
  async deleteDefect(
    @Param('ID') ID: number,
    @Param('pl') pl: string,
    @Param('activestatus') activestatus: number,
  ): Promise<DefectEntity[]> {
    return this.defectService.deleteByCondition(ID, pl, activestatus);
  }
}
