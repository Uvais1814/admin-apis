import { Test, TestingModule } from '@nestjs/testing';
import { JumboBatchService } from './jumbo-batch.service';

describe('JumboBatchService', () => {
  let service: JumboBatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JumboBatchService],
    }).compile();

    service = module.get<JumboBatchService>(JumboBatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
