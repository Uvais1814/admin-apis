import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { InspectionMachineService } from './inspection-machine.service';
import { InspectionMachineEntity } from './inspection-machine.entity';
import { InspectionShedEntity } from '../inspection-shed/inspection-shed.entity';
import { CreateMachineDTO } from './dto/create-inspection-machine.dto';
import { UpdateMachineDTO } from './dto/update-inspection-machine.dto';

@Controller('inspection-machine')
export class InspectionMachineController {
  constructor(
    private readonly MachineService: InspectionMachineService
  ) { }

  @Get('getConditionalMachine/:status/:plant')
  async getConditionalMachine(
    @Param('status') status: number,
    @Param('plant') plant: string,
  ): Promise<InspectionMachineEntity[]> {
    return this.MachineService.findByCondition(status, plant);
  }

  @Get('getShed/:plant')
  async getShed(
    @Param('plant') plant: string,
  ): Promise<InspectionShedEntity[]> {
    return this.MachineService.getInspShed(plant);
  }

  @Get('getJoinQuery/:plantno')
  async getJoinQuery(@Param('plantno') plantno: string): Promise<any[]> {
    return this.MachineService.getJoinValues(plantno);
  }

  @Post('/Save')
  async createMachine(@Body() createMachine: CreateMachineDTO): Promise<void> {
    return this.MachineService.createByCondition(createMachine);
  }

  @Patch('updateEmployee/:MachineID/:plant')
  async updateEmployee(
    @Param('MachineID') MachineID: number,
    @Param('plant') plant: string,
    @Body() UpdateMachine: UpdateMachineDTO,
  ): Promise<InspectionMachineEntity[]> {
    return this.MachineService.updateByCondition(MachineID, plant, UpdateMachine);
  }

  @Patch('deleteEmployee/:ID/:pl/:activestatus')
  async deleteEmployee(
    @Param('ID') ID: number,
    @Param('pl') pl: string,
    @Param('activestatus') activestatus: number,
  ): Promise<InspectionMachineEntity[]> {
    return this.MachineService.deleteByCondition(ID, pl, activestatus);
  }
}
