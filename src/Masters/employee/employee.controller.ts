import { Controller, Patch, Param, Body, Post, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDTO } from './dto/createemployee.dto';
import { UpdateEmployeeDTO } from './dto/updateemployee.dto';
import { EmployeeEntity } from './employee.entity';
import { DesignationEntity } from '../designation/designation.entity';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService
  ) { }

  @Get('getConditionalEmployee/:status/:plant')
  async getConditionalEmployee(
    @Param('status') status: number,
    @Param('plant') plant: string,
  ): Promise<EmployeeEntity[]> {
    return this.employeeService.getEmployeeWithDetails(status, plant);
  }

  @Get('getConstructor/:plant')
  async getConstructor(
    @Param('plant') plant: string,
  ): Promise<any[]> {
    return this.employeeService.getContactorByPlant(plant);
  }

  @Get('getDesignation')
  async getDesignation(): Promise<DesignationEntity[]> {
    return this.employeeService.getDesignationByPlant();
  }

  @Post('/Save')
  async createEmployee(@Body() createemployee: CreateEmployeeDTO): Promise<void> {
    return this.employeeService.createByCondition(createemployee);
  }

  @Patch('updateEmployee/:companyID/:plant')
  async updateEmployee(
    @Param('companyID') companyID: number,
    @Param('plant') plant: string,
    @Body() UpdateEmployee: UpdateEmployeeDTO,
  ): Promise<EmployeeEntity[]> {
    return this.employeeService.updateByCondition(companyID, plant, UpdateEmployee);
  }

  @Patch('deleteEmployee/:ID/:pl/:activestatus')
  async deleteEmployee(
    @Param('ID') ID: number,
    @Param('pl') pl: string,
    @Param('activestatus') activestatus: number,
  ): Promise<EmployeeEntity[]> {
    return this.employeeService.deleteByCondition(ID, pl, activestatus);
  }
}
