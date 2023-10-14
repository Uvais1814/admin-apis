import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';
import { DefectdeptService } from './defectdept.service';
import { DefectDeptEntity } from './defectdept.entity';
import { CreateDefectDeptDTO } from './dto/createdefectdept.dto';
import { UpdateDefectDeptDTO } from './dto/updatedefectdept.dto';
import { FabricTypeEntity } from '../fabric-type/fabric-type.entity';



@Controller('defectdept')
export class DefectdeptController {
  constructor(
    private readonly defectdeptService: DefectdeptService
  ) { }

  @Get('getConditionalDefectDept/:status/:plant')
  async getConditionalDefectDept(
    @Param('status') status: number,
    @Param('plant') plant: string,
  ): Promise<DefectDeptEntity[]> {
    return this.defectdeptService.findByCondition(status, plant);
  }

  @Get('/query')
  async getQuery(): Promise<FabricTypeEntity[]> {
    return this.defectdeptService.getCustomQuerys();
  }

  @Get('getJoinQuery/:plantno')
  async getJoinQuery(@Param('plantno') plantno: string): Promise<any[]> {
    return this.defectdeptService.getDefectDeptDetails(plantno);
  }

  @Post('/Save')
  async createDefectDept(@Body() createdefectdept: CreateDefectDeptDTO): Promise<void> {
    return this.defectdeptService.createByCondition(createdefectdept);
  }

  @Patch('updateDefectDept/:DefectDeptID/:plant')
  async updateDefectDept(
    @Param('DefectDeptID') DefectDeptID: number,
    @Param('plant') plant: string,
    @Body() UpdateDefectDept: UpdateDefectDeptDTO,
  ): Promise<DefectDeptEntity[]> {
    return this.defectdeptService.updateByCondition(DefectDeptID, plant, UpdateDefectDept);
  }

  @Patch('deleteDefectDept/:ID/:pl/:activestatus')
  async deleteDefectDept(
    @Param('ID') ID: number,
    @Param('pl') pl: string,
    @Param('activestatus') activestatus: number,
  ): Promise<DefectDeptEntity[]> {
    return this.defectdeptService.deleteByCondition(ID, pl, activestatus);
  }

}
