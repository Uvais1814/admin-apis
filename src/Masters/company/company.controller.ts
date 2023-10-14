import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyEntity } from './company.entity';
import { CompanyDTO } from './dto/createcompany.dto';
import { UpdateCompany } from './dto/updatecompany.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService
  ) { }

  @Get('getConditionalCompany/:status/:plant')
  async getConditionalCompany(
    @Param('status') status: number,
    @Param('plant') plant: string,
  ): Promise<CompanyEntity[]> {
    return this.companyService.findByCondition(status, plant);
  }

  @Post('/Save')
  async createCompany(@Body() createcompany: CompanyDTO): Promise<void> {
    return this.companyService.createByCondition(createcompany);
  }

  @Patch('updateCompany/:companyID/:plant')
  async updateCompany(
    @Param('companyID') companyID: number,
    @Param('plant') plant: string,
    @Body() UpdateCompany: UpdateCompany,
  ): Promise<CompanyEntity[]> {
    return this.companyService.updateByCondition(companyID, plant, UpdateCompany);
  }

  @Patch('deleteCompany/:ID/:pl/:activestatus')
  async deleteCompany(
    @Param('ID') ID: number,
    @Param('pl') pl: string,
    @Param('activestatus') activestatus: number,
  ): Promise<CompanyEntity[]> {
    return this.companyService.deleteByCondition(ID, pl, activestatus);
  }
}
