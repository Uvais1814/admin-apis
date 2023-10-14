import { Module } from '@nestjs/common';
import { ManualGrnController } from './manual-grn.controller';
import { ManualGrnService } from './manual-grn.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManualGrnEntity } from './manual-grn.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ManualGrnEntity])],
  controllers: [ManualGrnController],
  providers: [ManualGrnService]
})
export class ManualGrnModule {}
