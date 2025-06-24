import { Test, TestingModule } from '@nestjs/testing';
import { DucksController } from './ducks.controller';

describe('DucksController', () => {
  let controller: DucksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DucksController],
    }).compile();

    controller = module.get<DucksController>(DucksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
