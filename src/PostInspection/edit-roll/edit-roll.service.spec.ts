import { Test, TestingModule } from '@nestjs/testing';
import { EditRollService } from './edit-roll.service';

describe('EditRollService', () => {
  let service: EditRollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditRollService],
    }).compile();

    service = module.get<EditRollService>(EditRollService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
