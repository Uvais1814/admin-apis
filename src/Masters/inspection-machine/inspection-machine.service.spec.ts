import { Test, TestingModule } from '@nestjs/testing';
import { InspectionMachineService } from './inspection-machine.service';

describe('InspectionMachineService', () => {
  let service: InspectionMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionMachineService],
    }).compile();

    service = module.get<InspectionMachineService>(InspectionMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
