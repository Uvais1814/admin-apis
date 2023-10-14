import { Controller, Get, Param } from '@nestjs/common';
import { MDIService } from './mdi-form.services';
import { DesignationEntity } from 'src/Masters/designation/designation.entity';
import { mastDecisionEntity } from './mast-decision.entity';

@Controller('MDI')
export class MDIController {
  constructor(
    private readonly mdiService: MDIService,
  ) { }

  @Get('exeadminpath')
  async getexeadminpath(): Promise<mastDecisionEntity> {
    return this.mdiService.exeadminpath();
  }

  //http://localhost:3000/mastdecisions/SreverAdminPath

  @Get('ServerAdminPath')
  async getServerAdminPath(): Promise<mastDecisionEntity> {
    return this.mdiService.ServerAdminPath();
  }

  @Get('getDesignationId/:designationId')
  async getDesignationId(
    @Param('designationId') designationId: number
    
  ): Promise<DesignationEntity> {
    return this.mdiService.DesignationId(designationId)
  }

  @Get('getdsMenu/:userRole')
  async getdsMenu(
    @Param('userRole') userRole: string
  ): Promise<any[]> {
    return this.mdiService.dsMenu(userRole);
  }

}


