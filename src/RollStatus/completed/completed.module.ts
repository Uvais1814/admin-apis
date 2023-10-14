import { Module } from '@nestjs/common';
import { CompletedController } from './completed.controller';
import { CompletedService } from './completed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrnEntryEntity } from '../approved/entites/grn-entry.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GrnEntryEntity,SortEntity])],
  controllers: [CompletedController],
  providers: [CompletedService]
})
export class CompletedModule {}
