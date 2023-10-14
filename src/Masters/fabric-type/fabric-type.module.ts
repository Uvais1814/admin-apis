import { Module } from '@nestjs/common';
import { FabricTypeController } from './fabric-type.controller';
import { FabricTypeService } from './fabric-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricTypeEntity } from './fabric-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FabricTypeEntity])],
  controllers: [FabricTypeController],
  providers: [FabricTypeService]
})
export class FabricTypeModule { }
