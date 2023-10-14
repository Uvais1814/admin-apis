import { Test, TestingModule } from '@nestjs/testing';
import { ManualGrnService } from './manual-grn.service';

describe('ManualGrnService', () => {
  let service: ManualGrnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManualGrnService],
    }).compile();

    service = module.get<ManualGrnService>(ManualGrnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
