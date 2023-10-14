import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftDetailsController } from './shift-details.controller';
import { ShiftDetailsService } from './shift-details.service';
import { ShiftEntity } from './shift-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftEntity])],
  controllers: [ShiftDetailsController],
  providers: [ShiftDetailsService]
})
export class ShiftDetailsModule { }
