import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  liveUrl: string;

  @Prop()
  githubUrl: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: true })
  isPublished: boolean;

  @Prop({ default: 0 })
  order: number; // for controlling display order on frontend
}

export const ProjectSchema = SchemaFactory.createForClass(Project);