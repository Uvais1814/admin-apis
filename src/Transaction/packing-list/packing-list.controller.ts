import { Controller, Get, Body, Param, Patch, Post } from '@nestjs/common';
import { PackingListService } from './packing-list.service';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { CustomerEntity } from 'src/Entities/customer.entity';
import { CustomerDTO } from 'src/DTOs/customer.dto';
import { PackingListDTO } from './packing-list.dto';
import { PackingListEntity } from './packing-list.entity';

@Controller('packing-list')
export class PackingListController {
  constructor(
    private readonly PackListService: PackingListService
  ) { }

  @Get('LoadSort')
  async getSort(): Promise<GrnEntryEntity[]> {
    return this.PackListService.Sort();
  }

  @Get('LoadCustomer')
  async getCustomer(): Promise<CustomerEntity[]> {
    return this.PackListService.Customer();
  }

  @Get('LoadCustomerID/:name')
  async getCustomerID(
    @Param('name') name: string
  ): Promise<CustomerEntity> {
    return this.PackListService.CustomerID(name);
  }

  @Post('SaveCustomer')
  async CreateCustomer(
    @Body() InsertCustomer: CustomerDTO
  ): Promise<CustomerEntity> {
    return this.PackListService.CreateCustomer(InsertCustomer);
  }

  @Get('LoadRollNo/:sort')
  async getRollNo(
    @Param('sort') sort: string
  ): Promise<any[]> {
    return this.PackListService.LoadRoll(sort);
  }

  @Get('PresentDay')
  async getPresentDay(): Promise<string> {
    return this.PackListService.PresentDay();
  }

  @Get('ListCount')
  async getPackingList(): Promise<any[]> {
    return this.PackListService.PackingList();
  }

  @Post('SavePackingList')
  async CreatePacking(
    @Body() InsertPLEntry: PackingListDTO
  ): Promise<PackingListEntity> {
    return this.PackListService.CreatePackingList(InsertPLEntry);
  }

  @Patch('UpdateInspMain/:plNo/:rollNo')
  async UpdateInspectionMain(
    @Param('plNo') plNo: string,
    @Param('rollNo') rollNo: string,
  ): Promise<void> {
    return this.PackListService.InspectionMain(plNo, rollNo);
  }

}
