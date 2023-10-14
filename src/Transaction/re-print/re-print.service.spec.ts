import { Test, TestingModule } from '@nestjs/testing';
import { RePrintService } from './re-print.service';

describe('RePrintService', () => {
  let service: RePrintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RePrintService],
    }).compile();

    service = module.get<RePrintService>(RePrintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
