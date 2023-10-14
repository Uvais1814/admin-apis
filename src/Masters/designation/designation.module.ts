import { Module } from '@nestjs/common';
import { DesignationController } from './designation.controller';
import { DesignationService } from './designation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignationEntity } from './designation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DesignationEntity])],
  controllers: [DesignationController],
  providers: [DesignationService]
})
export class DesignationModule { }
