import { Test, TestingModule } from '@nestjs/testing';
import { InspectionShedService } from './inspection-shed.service';

describe('InspectionShedService', () => {
  let service: InspectionShedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionShedService],
    }).compile();

    service = module.get<InspectionShedService>(InspectionShedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
