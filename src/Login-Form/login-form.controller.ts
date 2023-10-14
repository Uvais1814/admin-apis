import { Controller, Get, Param } from '@nestjs/common';
import { LoginFormService } from './login-form.service';
import { EmployeeEntity } from 'src/Masters/employee/employee.entity';
import { DesignationEntity } from 'src/Masters/designation/designation.entity';

@Controller('login-form')
export class LoginFormController {
  constructor(
    private readonly LoginService: LoginFormService
  ) { }

  @Get('view/:plant')
  async getDss(
    @Param('plant') plant: string,
  ): Promise<EmployeeEntity[]> {
    return this.LoginService.dss(plant);
  }

  @Get('EmpType/:userID/:plant')
  async getEmpType(
    @Param('userID') userID: number,
    @Param('plant') plant: string,
  ): Promise<EmployeeEntity> {
    return this.LoginService.ds(userID, plant);
  }

  @Get('EmpName/:userID/:plant')
  async getEmpName(
    @Param('userID') userID: number,
    @Param('plant') plant: string,
  ): Promise<EmployeeEntity> {
    return this.LoginService.d(userID, plant);
  }

  @Get('DName/:userID/:plant')
  async getDesignationName(
    @Param('userID') userID: number,
    @Param('plant') plant: string,
  ): Promise<DesignationEntity> {
    return this.LoginService.do(userID, plant);
  }
}
