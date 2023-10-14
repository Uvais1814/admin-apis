import { Module } from '@nestjs/common';
import { SortController } from './sort.controller';
import { SortService } from './sort.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortEntity } from './sort.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SortEntity])],
  controllers: [SortController],
  providers: [SortService]
})
export class SortModule { }
