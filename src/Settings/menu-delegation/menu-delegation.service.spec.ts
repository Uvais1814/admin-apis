import { Test, TestingModule } from '@nestjs/testing';
import { MenuDelegationService } from './menu-delegation.service';

describe('MenuDelegationService', () => {
  let service: MenuDelegationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuDelegationService],
    }).compile();

    service = module.get<MenuDelegationService>(MenuDelegationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
