import { Test, TestingModule } from '@nestjs/testing';
import { GradeSettingsService } from './grade-settings.service';

describe('GradeSettingsService', () => {
  let service: GradeSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeSettingsService],
    }).compile();

    service = module.get<GradeSettingsService>(GradeSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
