import { UserService } from './user.service';
import { UserModel } from './user.model';
import {ArticleModel} from '../article/article.model';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ArticleService } from 'src/article/article.service';
import { CommentModel } from 'src/comment/comment.model';
import { CommentService } from 'src/comment/comment.service';

@Resolver(of => UserModel)
export class UserResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(ArticleService) private articleService: ArticleService,
    @Inject(CommentService) private commentService: CommentService
  ) { }

  @Query(returns => UserModel)
  async user(@Args('id') id: string): Promise<UserModel> {
    return await this.userService.findOne(id);
  }

  @ResolveField(returns => [ArticleModel])
  async articles(@Parent() user) {
    const { id } = user;
    return this.articleService.findByUser(id);
  }

  @ResolveField(returns => [CommentModel])
  async comments(@Parent() user) {
    const { id } = user;
    const response = this.commentService.findByUser(id)
    return response;
  }

  @Query(returns => [UserModel])
  async users(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Mutation(returns => UserModel)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('phone', { nullable: true }) phone: string,
    @Args('address', { nullable: true }) address: string,
  ): Promise<UserModel> {
    return await this.userService.create({ name, email, phone, address })
  }
}