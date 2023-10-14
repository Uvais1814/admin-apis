import { Test, TestingModule } from '@nestjs/testing';
import { ControlSettingsController } from './control-settings.controller';

describe('ControlSettingsController', () => {
  let controller: ControlSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlSettingsController],
    }).compile();

    controller = module.get<ControlSettingsController>(ControlSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
