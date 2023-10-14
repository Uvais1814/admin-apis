import { Module } from '@nestjs/common';
import { JumboBatchController } from './jumbo-batch.controller';
import { JumboBatchService } from './jumbo-batch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { DespatchEntity } from './entities/despatch-entry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InspectionMain,SortEntity,DespatchEntity])],
  controllers: [JumboBatchController],
  providers: [JumboBatchService]
})
export class JumboBatchModule {}
