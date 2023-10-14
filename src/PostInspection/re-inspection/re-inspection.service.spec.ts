import { Test, TestingModule } from '@nestjs/testing';
import { ReInspectionService } from './re-inspection.service';

describe('ReInspectionService', () => {
  let service: ReInspectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReInspectionService],
    }).compile();

    service = module.get<ReInspectionService>(ReInspectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
