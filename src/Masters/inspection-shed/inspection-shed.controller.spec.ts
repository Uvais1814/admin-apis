import { Test, TestingModule } from '@nestjs/testing';
import { InspectionShedController } from './inspection-shed.controller';

describe('InspectionShedController', () => {
  let controller: InspectionShedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionShedController],
    }).compile();

    controller = module.get<InspectionShedController>(InspectionShedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
