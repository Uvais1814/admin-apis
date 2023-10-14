import { Module } from '@nestjs/common';
import { LoginFormController } from './login-form.controller';
import { LoginFormService } from './login-form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/Masters/employee/employee.entity';
import { DesignationEntity } from 'src/Masters/designation/designation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, DesignationEntity])],
  controllers: [LoginFormController],
  providers: [LoginFormService]
})
export class LoginFormModule { }
