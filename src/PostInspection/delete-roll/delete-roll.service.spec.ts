import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRollService } from './delete-roll.service';

describe('DeleteRollService', () => {
  let service: DeleteRollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteRollService],
    }).compile();

    service = module.get<DeleteRollService>(DeleteRollService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
