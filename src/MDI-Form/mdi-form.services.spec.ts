import { Test, TestingModule } from '@nestjs/testing';
import { MDIService } from './mdi-form.services';

describe('MastDecisionService', () => {
  let service: MDIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MDIService],
    }).compile();

    service = module.get<MDIService>(MDIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
