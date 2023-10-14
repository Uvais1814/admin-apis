import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';
import { ContractorEntity } from '../contractor/contractor.entity';
import { DesignationEntity } from '../designation/designation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, ContractorEntity, DesignationEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule { }
