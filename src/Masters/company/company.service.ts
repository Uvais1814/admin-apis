import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDTO } from './dto/createcompany.dto';
import { CompanyEntity } from './company.entity';
import { UpdateCompany } from './dto/updatecompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly CompanyRepo: Repository<CompanyEntity>,
  ) { }

  async findByCondition(status: number, plant: string): Promise<CompanyEntity[]> {
    return this.CompanyRepo.find({
      where: {
        ActiveStatus: status,
        Plant: plant,
      },
    });
  }

  async createByCondition(createcompanyDto: CompanyDTO): Promise<void> {
    //const { CompanyName, Logo, Caption, Address, TINNo, CSTNo, Phone, Email, Website, ActiveStatus, Plant } = createcompanyDto;
    const { CompanyName, Caption, Address, TINNo, CSTNo, Phone, Email, Website, ActiveStatus, Plant } = createcompanyDto;

    const existingCompany = await this.CompanyRepo.findOne({
      where: {
        CompanyName: CompanyName,
        ActiveStatus: 1,
        Plant: Plant,
      },
    });

    if (!existingCompany) {
      const newCompany = this.CompanyRepo.create({
        CompanyName: CompanyName,
        //Logo: Logo,
        Caption: Caption,
        Address: Address,
        TINNo: TINNo,
        CSTNo: CSTNo,
        Phone: Phone,
        Email: Email,
        Website: Website,
        ActiveStatus: ActiveStatus,
        Plant: Plant,
      });
      await this.CompanyRepo.save(newCompany);
    }
  }

  async updateByCondition(companyID: number, plant: string, updateData: UpdateCompany): Promise<CompanyEntity[]> {
    const companiesToUpdate = await this.CompanyRepo.find({
      where: {
        CompanyID: companyID,
        Plant: plant,
      },
    });

    //Perform the update operation on each retrieved company
    for (const company of companiesToUpdate) {
      //Update the properties of the company based on the updateData
      company.CompanyName = updateData.CompanyName;
      //company.Logo = updateData.Logo;
      company.Caption = updateData.Caption;
      company.Address = updateData.Address;
      company.TINNo = updateData.TINNo;
      company.CSTNo = updateData.CSTNo;
      company.Phone = updateData.Phone;
      company.Email = updateData.Email;
      company.Website = company.Website;

      //Save the updated company back to the database
      await this.CompanyRepo.save(company);
    }
    return companiesToUpdate;
  }

  async deleteByCondition(ID: number, pl: string, activestatus: number): Promise<CompanyEntity[]> {
    const companiesToDelete = await this.CompanyRepo.find({
      where: {
        CompanyID: ID,
        Plant: pl,
      },
    });

    // Perform the deletion operation on each retrieved company
    for (const company of companiesToDelete) {
      // Perform any necessary deletion logic, such as setting the 'activestatus' to a specific value
      company.ActiveStatus = activestatus;

      // Save the updated company back to the database or delete it using the appropriate method
      await this.CompanyRepo.save(company); // Or use the appropriate delete method
    }

    return companiesToDelete;
  }

}
