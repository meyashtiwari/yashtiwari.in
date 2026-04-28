export class CreateProjectDto {
  title: string;
  description: string;
  tags: string[];
  link: string;
  blog_link?: string;
  image?: string;
}