import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { Optional } from '@nestjs/common';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @Optional()
  title: string;

  @Optional()
  content: string;

  @Optional()
  image: string;
}
