import { Test, TestingModule } from '@nestjs/testing';
import { StatusChangeService } from './status-change.service';

describe('StatusChangeService', () => {
  let service: StatusChangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusChangeService],
    }).compile();

    service = module.get<StatusChangeService>(StatusChangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
