import { Test, TestingModule } from '@nestjs/testing';
import { LoomService } from './loom.service';

describe('LoomService', () => {
  let service: LoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoomService],
    }).compile();

    service = module.get<LoomService>(LoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
