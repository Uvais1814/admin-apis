import { Controller, Get, Patch, Param } from '@nestjs/common';
import { EditRollService } from './edit-roll.service';

@Controller('edit-roll')
export class EditRollController {
  constructor(
    private readonly EditService: EditRollService
  ) { }

  @Get('GreySort/:DTPfromDate/:DTPtoDate/:Plant')
  async GreySort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.EditService.getGreySort(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('GreyRoll/:DTPfromDate/:DTPtoDate/:Plant')
  async GreyRoll(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.EditService.getGreyRoll(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('FinalSort/:DTPfromDate/:DTPtoDate/:Plant')
  async FinalSort(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.EditService.getFinalSort(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('FinalRoll/:DTPfromDate/:DTPtoDate/:Plant')
  async FinalRoll(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string
  ): Promise<any[]> {
    return this.EditService.getFinalRoll(DTPfromDate, DTPtoDate, Plant);
  }

  @Get('CmbRollGrey/:DTPfromDate/:DTPtoDate/:Plant/:SortID')
  async CmbRollGrey(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.EditService.getCmbRollGrey(DTPfromDate, DTPtoDate, Plant, SortID);
  }

  @Get('CmbRollFinal/:DTPfromDate/:DTPtoDate/:Plant/:SortID')
  async CmbRollFinal(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('SortID') SortID: string
  ): Promise<any[]> {
    return this.EditService.getCmbRollFinal(DTPfromDate, DTPtoDate, Plant, SortID);
  }

  @Get('DSSGrey/:DTPfromDate/:DTPtoDate/:Plant/:Qry?')
  async DSSGrey(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry?: string
  ): Promise<any[]> {
    return this.EditService.getDSSGrey(DTPfromDate, DTPtoDate, Plant, Qry);
  }

  @Get('DSSFinal/:DTPfromDate/:DTPtoDate/:Plant/:Qry')
  async DSSFinal(
    @Param('DTPfromDate') DTPfromDate: Date,
    @Param('DTPtoDate') DTPtoDate: Date,
    @Param('Plant') Plant: string,
    @Param('Qry') Qry: string
  ): Promise<any[]> {
    return this.EditService.getDSSFinal(DTPfromDate, DTPtoDate, Plant, Qry);
  }

}
