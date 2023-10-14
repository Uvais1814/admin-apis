import { Module } from '@nestjs/common';
import { CutLookingApprovalService } from './cut-looking-approval.service';
import { CutLookingApprovalController } from './cut-looking-approval.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InspectionMain,GrnEntryEntity])],
  providers: [CutLookingApprovalService],
  controllers: [CutLookingApprovalController]
})
export class CutLookingApprovalModule {}
