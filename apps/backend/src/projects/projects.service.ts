import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async createBulk(
    createProjectDtos: CreateProjectDto[],
  ): Promise<ProjectDocument[]> {
    if (!createProjectDtos.length) {
      throw new BadRequestException('projects array cannot be empty');
    }

    const createdProjects = await this.projectModel.insertMany(createProjectDtos);
    return createdProjects as ProjectDocument[];
  }

  async findAll(published?: string, featured?: string): Promise<Project[]> {
    const filter: Record<string, boolean> = {};

    // Parse and add published filter if provided
    if (published !== undefined && published !== '') {
      filter.isPublished = published === 'true';
    }

    // Parse and add featured filter if provided
    if (featured !== undefined && featured !== '') {
      filter.featured = featured === 'true';
    }

    return this.projectModel
      .find(filter)
      .sort({ order: 1 })
      .exec();
  }

  async search(query: string): Promise<ProjectDocument[]> {
    const results = await this.projectModel
      .find({ title: { $regex: query, $options: 'i' } })
      .exec();

    if (!results || results.length === 0) {
      throw new NotFoundException(
        `No records found with query matching: ${query}`,
      );
    }

    return results;
  }

  async findPublished(): Promise<Project[]> {
    return this.projectModel
      .find({ isPublished: true })
      .sort({ order: 1 })
      .exec();
  }

  async findFeatured(): Promise<Project[]> {
    return this.projectModel
      .find({ featured: true, isPublished: true })
      .sort({ order: 1 })
      .exec();
  }

  // READ ONE
  async findOne(id: string): Promise<Project> {
    // Always validate MongoDB ObjectId before querying
    // Otherwise Mongoose throws an ugly CastError
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`${id} is not a valid id`);
    }

    const project = await this.projectModel.findById(id).exec();

    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }

    return project;
  }

  // UPDATE
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`${id} is not a valid id`);
    }

    const project = await this.projectModel
      .findByIdAndUpdate(
        id,
        updateProjectDto,
        { returnDocument: 'after' }, // return the updated document, not the old one
      )
      .exec();

    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }

    return project;
  }

  // DELETE
  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`${id} is not a valid id`);
    }

    const result = await this.projectModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Project #${id} not found`);
    }
  }
}
