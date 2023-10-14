import { Test, TestingModule } from '@nestjs/testing';
import { ShiftDetailsService } from './shift-details.service';

describe('ShiftDetailsService', () => {
  let service: ShiftDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShiftDetailsService],
    }).compile();

    service = module.get<ShiftDetailsService>(ShiftDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
