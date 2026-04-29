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
    const payload = {
      projects: [
        {
          title: 'Project 1',
          description: 'Description 1',
          thumbnail: 'thumb-1.png',
        },
        {
          title: 'Project 1',
          description: 'Description 1',
          thumbnail: 'thumb-1.png',
        },
      ],
    };

    projectsServiceMock.createBulk.mockResolvedValue(payload.projects);

    await expect(controller.createBulk(payload as never)).resolves.toEqual(
      payload.projects,
    );
    expect(projectsServiceMock.createBulk).toHaveBeenCalledWith(
      payload.projects,
    );
  });
});
