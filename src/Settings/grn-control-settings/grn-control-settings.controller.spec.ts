import { Test, TestingModule } from '@nestjs/testing';
import { GrnControlSettingsController } from './grn-control-settings.controller';

describe('GrnControlSettingsController', () => {
  let controller: GrnControlSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrnControlSettingsController],
    }).compile();

    controller = module.get<GrnControlSettingsController>(GrnControlSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
