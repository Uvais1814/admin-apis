import { Test, TestingModule } from '@nestjs/testing';
import { ManualEntryService } from './manual-entry.service';

describe('ManualEntryService', () => {
  let service: ManualEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManualEntryService],
    }).compile();

    service = module.get<ManualEntryService>(ManualEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
