import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AllowAny, Public } from '@/auths/decorator/metadata';
import { JwtAuthGuard } from '@/auths/passport/jwt-auth.guard';
import { queryDTO_Post } from './dto/query-post.dto';
import { Roles } from '@/auths/decorator/roles.decorator';
import { Role } from '../users/helpers/utills';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() createPostDto: CreatePostDto) {
    const user_id = req.user.userId;
    return this.postsService.create(createPostDto, user_id);
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  findAll(@Query() queryDTO: queryDTO_Post, @Req() req: any) {
    const user = req.user;
    return this.postsService.findAll(queryDTO, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch()
  @Roles(Role.Admin, Role.User)
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: any,
    @Query('id') postId: string,
  ) {
    const user = req.user;
    return this.postsService.update(updatePostDto, user, postId);
  }

  @Delete()
  @Roles(Role.Admin, Role.User)
  remove(@Req() req: any, @Query('_ID') postId: string) {
    return this.postsService.remove(postId, req.user);
  }
}
