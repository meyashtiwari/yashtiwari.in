import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  const projectsServiceMock = {
    create: jest.fn(),
    createBulk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [{ provide: ProjectsService, useValue: projectsServiceMock }],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delegate bulk creation to the service', async () => {
    const payload = [
      {
        title: 'Project 1',
        description: 'Description 1',
        thumbnail: 'thumb-1.png',
      },
      {
        title: 'Project 2',
        description: 'Description 2',
        thumbnail: 'thumb-2.png',
      },
    ];

    projectsServiceMock.createBulk.mockResolvedValue(payload);

    await expect(controller.createBulk(payload as never)).resolves.toEqual(payload);
    expect(projectsServiceMock.createBulk).toHaveBeenCalledWith(payload);
  });
});
