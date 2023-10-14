import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/createemployee.dto';
import { UpdateEmployeeDTO } from './dto/updateemployee.dto';
import { EmployeeEntity } from './employee.entity';
import { ContractorEntity } from '../contractor/contractor.entity';
import { DesignationEntity } from '../designation/designation.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly EmployeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(ContractorEntity)
    private readonly ContractorRepo: Repository<ContractorEntity>,
    @InjectRepository(DesignationEntity)
    private readonly DesignationRepo: Repository<DesignationEntity>
  ) { }

  async findByCondition(status: number, plant: string): Promise<EmployeeEntity[]> {
    return this.EmployeeRepo.find({
      where: {
        ActiveStatus: status,
        Plant: plant,
      },
    });
  }

  async getEmployeeWithDetails(status: number, plantno: string): Promise<any[]> {
    return this.EmployeeRepo
      .createQueryBuilder('e')
      .select('e.EmpId, d.Name, e.InspectorType, c.ContractorName, e.EmpCode, e.EmpUser, e.EmpPass, e.EmpName')
      .innerJoin('MastDesignation', 'd', 'd.designationId = e.EmpType')
      .leftJoin('MastContractor', 'c', 'c.contractorId = e.EmpContractor')
      .where('e.ActiveStatus =:activeStatus', { activeStatus: status })
      .andWhere('e.Plant =:plantNo', { plantNo: plantno })
      .getRawMany();
  }

  async getContactorByPlant(plant: string): Promise<ContractorEntity[]> {
    return this.ContractorRepo.find({
      select: ['ContractorID', 'ContractorName'],
      where: {
        ActiveStatus: 1,
        Plant: plant,
      },
      order: {
        ContractorID: 'ASC',
      }
    });
  }

  async getDesignationByPlant(): Promise<DesignationEntity[]> {
    return this.DesignationRepo.find({
      select: ['DesignationID', 'Name'],
      where: {
        ActiveStatus: 1
      },
      order: {
        DesignationID: 'ASC',
      }
    });
  }



  async createByCondition(createEmployee: CreateEmployeeDTO): Promise<void> {
    const { EmpType, EmpContractor, EmpCode, EmpUser, EmpPass, EmpName, EmpImage, EntryDate, ActiveStatus, InspectorType, Plant } = createEmployee;

    const existingCompany = await this.EmployeeRepo.findOne({
      where: {
        EmpCode: EmpCode,
        ActiveStatus: 1,
        Plant: Plant,
      },
    });

    if (!existingCompany) {
      const newCompany = this.EmployeeRepo.create({
        EmpType: EmpType,
        EmpContractor: EmpContractor,
        EmpCode: EmpCode,
        EmpUser: EmpUser,
        EmpPass: EmpPass,
        EmpName: EmpName,
        EmpImage: EmpImage,
        EntryDate: EntryDate,
        ActiveStatus: ActiveStatus,
        InspectorType: InspectorType,
        Plant: Plant,
      });
      await this.EmployeeRepo.save(newCompany);
    }
  }

  async updateByCondition(empid: number, plant: string, updateData: UpdateEmployeeDTO): Promise<EmployeeEntity[]> {
    const companiesToUpdate = await this.EmployeeRepo.find({
      where: {
        EmpId: empid,
        Plant: plant,
      },
    });

    //Perform the update operation on each retrieved company
    for (const company of companiesToUpdate) {
      //Update the properties of the company based on the updateData
      company.EmpType = updateData.EmpType;
      company.EmpContractor = updateData.EmpContractor;
      company.EmpCode = updateData.EmpCode;
      company.EmpUser = updateData.EmpUser;
      company.EmpPass = updateData.EmpPass;
      company.EmpName = updateData.EmpName;
      company.EmpImage = updateData.EmpImage;

      //Save the updated company back to the database
      await this.EmployeeRepo.save(company);
    }
    return companiesToUpdate;
  }

  async deleteByCondition(ID: number, pl: string, activestatus: number): Promise<EmployeeEntity[]> {
    const companiesToDelete = await this.EmployeeRepo.find({
      where: {
        EmpId: ID,
        Plant: pl,
      },
    });

    // Perform the deletion operation on each retrieved company
    for (const company of companiesToDelete) {
      // Perform any necessary deletion logic, such as setting the 'activestatus' to a specific value
      company.ActiveStatus = activestatus;

      // Save the updated company back to the database or delete it using the appropriate method
      await this.EmployeeRepo.save(company); // Or use the appropriate delete method
    }
    return companiesToDelete;
  }
}
