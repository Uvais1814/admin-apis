import { Module } from '@nestjs/common';
import { PackingListController } from './packing-list.controller';
import { PackingListService } from './packing-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackingListEntity } from './packing-list.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { CustomerEntity } from 'src/Entities/customer.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackingListEntity, GrnEntryEntity, CustomerEntity, InspectionMain])],
  controllers: [PackingListController],
  providers: [PackingListService]
})
export class PackingListModule { }
