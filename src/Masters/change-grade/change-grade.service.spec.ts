import { Test, TestingModule } from '@nestjs/testing';
import { ChangeGradeService } from './change-grade.service';

describe('ChangeGradeService', () => {
  let service: ChangeGradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChangeGradeService],
    }).compile();

    service = module.get<ChangeGradeService>(ChangeGradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
