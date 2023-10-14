import { Module } from '@nestjs/common';
import { InProgressController } from './in-progress.controller';
import { InProgressService } from './in-progress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrnEntryEntity } from '../approved/entites/grn-entry.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GrnEntryEntity,SortEntity])],
  controllers: [InProgressController],
  providers: [InProgressService]
})
export class InProgressModule {}
