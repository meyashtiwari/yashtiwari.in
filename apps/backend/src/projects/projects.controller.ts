import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {

  @Get()
  index() {
    return {};
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return { id };
  }

  @Post('create')
  store(@Body() createProjectDto: CreateProjectDto) {
    return {
      ...createProjectDto,
    };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return {
      id,
      ...updateProjectDto,
    }
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return {
      id
    }
  }
}
