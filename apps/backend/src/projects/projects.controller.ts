import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // POST /api/projects
  @Post()
  @HttpCode(HttpStatus.CREATED) // returns 201
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  // GET /api/projects
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  // GET /api/projects/published
  @Get('published')
  findPublished() {
    return this.projectsService.findPublished();
  }

  // GET /api/projects/featured
  @Get('featured')
  findFeatured() {
    return this.projectsService.findFeatured();
  }

  // GET /api/projects/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  // PATCH /api/projects/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  // DELETE /api/projects/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // returns 204
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
