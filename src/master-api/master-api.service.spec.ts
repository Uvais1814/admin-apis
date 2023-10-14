import { Test, TestingModule } from '@nestjs/testing';
import { MasterApiService } from './master-api.service';

describe('MasterApiService', () => {
  let service: MasterApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterApiService],
    }).compile();

    service = module.get<MasterApiService>(MasterApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
