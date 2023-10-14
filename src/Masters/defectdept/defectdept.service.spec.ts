import { Test, TestingModule } from '@nestjs/testing';
import { DefectdeptService } from './defectdept.service';

describe('DefectdeptService', () => {
  let service: DefectdeptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefectdeptService],
    }).compile();

    service = module.get<DefectdeptService>(DefectdeptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
