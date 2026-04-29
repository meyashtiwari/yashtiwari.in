import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { ProjectsGuard } from './projects.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // POST /api/projects
  @Post()
  @HttpCode(HttpStatus.CREATED) // returns 201
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  // POST /api/projects/bulk
  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  createBulk(
    @Body(
      new ParseArrayPipe({
        items: CreateProjectDto,
      }),
    )
    createProjectDtos: CreateProjectDto[],
  ) {
    return this.projectsService.createBulk(createProjectDtos);
  }

  // GET /api/projects
  @Get()
  findAll(
    @Query('published') published?: string,
    @Query('featured') featured?: string
  ) {
    return this.projectsService.findAll(published, featured);
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
  @UseGuards(ProjectsGuard)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
