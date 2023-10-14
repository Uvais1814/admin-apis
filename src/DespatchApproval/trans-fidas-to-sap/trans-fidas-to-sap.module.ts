import { Module } from '@nestjs/common';
import { TransFidasToSapController } from './trans-fidas-to-sap.controller';
import { TransFidasToSapService } from './trans-fidas-to-sap.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SAPUploadedEntity } from '../fidasto-sap/sap-uploaded.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SAPUploadedEntity])],
  controllers: [TransFidasToSapController],
  providers: [TransFidasToSapService]
})
export class TransFidasToSapModule {}
