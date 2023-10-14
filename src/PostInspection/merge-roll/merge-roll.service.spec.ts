import { Test, TestingModule } from '@nestjs/testing';
import { MergeRollService } from './merge-roll.service';

describe('MergeRollService', () => {
  let service: MergeRollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MergeRollService],
    }).compile();

    service = module.get<MergeRollService>(MergeRollService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
