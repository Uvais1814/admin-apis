import { Test, TestingModule } from '@nestjs/testing';
import { CutLookingApprovalService } from './cut-looking-approval.service';

describe('CutLookingApprovalService', () => {
  let service: CutLookingApprovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CutLookingApprovalService],
    }).compile();

    service = module.get<CutLookingApprovalService>(CutLookingApprovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
