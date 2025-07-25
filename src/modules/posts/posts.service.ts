import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private PostModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto, user_id: string) {
    const createNewPost = new this.PostModel({
      ...createPostDto,
      author: user_id,
    });

    return await createNewPost.save();
  }

  async findAll(query: any, user: any) {
    const { filter, sort } = aqp(query);

    if (user.role?.includes('USERS')) {
      filter.author = user.userId;
    }

    if (filter.Page) delete filter.Page;
    if (filter.currenPage) delete filter.currenPage;

    if (
      typeof filter.name === 'string' &&
      filter.name.trim() !== '' &&
      filter.name !== 'undefined'
    ) {
      filter.title = { $regex: filter.name, $options: 'i' };
      delete filter.name;
    }

    const TotalItems = (await this.PostModel.find(filter)).length;
    const TotalPages = Math.ceil(TotalItems / query.currenPage);
    const skip = (query.Page - 1) * query.currenPage;

    const results = await this.PostModel.find(filter)
      .skip(skip)
      .limit(query.currenPage)
      .sort(sort as any);

    return { results, TotalPages };
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(updatePostDto: UpdatePostDto, user: any, postId: string) {
    const post = await this.PostModel.findById(postId);
    const user_ID = user.userId;
    if (!post) {
      throw new NotFoundException('Bài viết ko tồn tại');
    }

    if (user.role !== 'ADMIN' && post.author.toString() !== user_ID) {
      throw new NotFoundException('Bạn ko có quyền chỉnh sửa nội dung này');
    }

    await this.PostModel.updateOne({ _id: postId }, { ...updatePostDto });

    return { message: 'Update thành công' };
  }

  async remove(postId: string, user: any) {
    const post = await this.PostModel.findById(postId);
    const user_ID = user.userId;
    if (!post) {
      throw new NotFoundException('Bài viết ko tồn tại');
    }

    if (user.role !== 'ADMIN' && post.author.toString() !== user_ID) {
      throw new NotFoundException('Bạn ko có quyền chỉnh sửa nội dung này');
    }
    await this.PostModel.deleteOne({ postId });
    return { message: 'Delete thành công' };
  }
}
