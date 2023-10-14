import { Test, TestingModule } from '@nestjs/testing';
import { CutLookingApprovalController } from './cut-looking-approval.controller';

describe('CutLookingApprovalController', () => {
  let controller: CutLookingApprovalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CutLookingApprovalController],
    }).compile();

    controller = module.get<CutLookingApprovalController>(CutLookingApprovalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
