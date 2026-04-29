import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Project } from './schemas/project.schema';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  const projectModelMock = {
    insertMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: getModelToken(Project.name), useValue: projectModelMock },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should bulk insert projects', async () => {
    const projects = [
      {
        title: 'Project 1',
        description: 'Description 1',
        thumbnail: 'thumb-1.png',
      },
    ];

    projectModelMock.insertMany.mockResolvedValue(projects);

    await expect(service.createBulk(projects as never)).resolves.toEqual(
      projects,
    );
    expect(projectModelMock.insertMany).toHaveBeenCalledWith(projects);
  });

  it('should reject empty bulk inserts', async () => {
    await expect(service.createBulk([])).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
