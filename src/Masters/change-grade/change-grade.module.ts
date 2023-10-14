import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeGradeController } from './change-grade.controller';
import { ChangeGradeService } from './change-grade.service';
import { ChangeGradeEntity } from './change-grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChangeGradeEntity])],
  controllers: [ChangeGradeController],
  providers: [ChangeGradeService]
})
export class ChangeGradeModule { }
