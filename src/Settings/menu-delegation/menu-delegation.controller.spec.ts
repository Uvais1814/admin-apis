import { Test, TestingModule } from '@nestjs/testing';
import { MenuDelegationController } from './menu-delegation.controller';

describe('MenuDelegationController', () => {
  let controller: MenuDelegationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuDelegationController],
    }).compile();

    controller = module.get<MenuDelegationController>(MenuDelegationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
