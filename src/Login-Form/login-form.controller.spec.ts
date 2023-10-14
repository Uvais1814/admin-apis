import { Test, TestingModule } from '@nestjs/testing';
import { LoginFormController } from './login-form.controller';

describe('LoginFormController', () => {
  let controller: LoginFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginFormController],
    }).compile();

    controller = module.get<LoginFormController>(LoginFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
