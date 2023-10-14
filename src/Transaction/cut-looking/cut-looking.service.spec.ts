import { Test, TestingModule } from '@nestjs/testing';
import { CutLookingService } from './cut-looking.service';

describe('CutLookingService', () => {
  let service: CutLookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CutLookingService],
    }).compile();

    service = module.get<CutLookingService>(CutLookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
