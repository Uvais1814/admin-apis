import { Test, TestingModule } from '@nestjs/testing';
import { TransFidasToSapService } from './trans-fidas-to-sap.service';

describe('TransFidasToSapService', () => {
  let service: TransFidasToSapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransFidasToSapService],
    }).compile();

    service = module.get<TransFidasToSapService>(TransFidasToSapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
