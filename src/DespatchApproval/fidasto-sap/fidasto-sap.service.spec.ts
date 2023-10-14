import { Test, TestingModule } from '@nestjs/testing';
import { FidastoSapService } from './fidasto-sap.service';

describe('FidastoSapService', () => {
  let service: FidastoSapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FidastoSapService],
    }).compile();

    service = module.get<FidastoSapService>(FidastoSapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
