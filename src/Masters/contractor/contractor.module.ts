import { Module } from '@nestjs/common';
import { ContractorController } from './contractor.controller';
import { ContractorService } from './contractor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorEntity } from './contractor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractorEntity])],
  controllers: [ContractorController],
  providers: [ContractorService]
})
export class ContractorModule { }
