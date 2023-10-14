import { Test, TestingModule } from '@nestjs/testing';
import { InspectionMachineController } from './inspection-machine.controller';

describe('InspectionMachineController', () => {
  let controller: InspectionMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionMachineController],
    }).compile();

    controller = module.get<InspectionMachineController>(InspectionMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
