import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreateCommentDTO } from './comment.dto';
import { UserService } from '../user/user.service';
import { ArticleService } from '../article/article.service';
import { CommentService } from './comment.service';
import { CommentModel } from './comment.model';
import { UserModel } from 'src/user/user.model';
import { ArticleModel } from 'src/article/article.model';

@Resolver(of => CommentModel)
export class CommentResolver {
  constructor(
    @Inject(ArticleService) private articleService: ArticleService,
    @Inject(UserService) private userService: UserService,
    @Inject(CommentService) private commentService: CommentService
  ) { }

  @Query(returns => CommentModel)
  async comment(@Args('id') id: string): Promise<CommentModel> {
    return await this.commentService.findOne(id);
  }

  @ResolveField(returns => ArticleModel)
  async article(@Parent() comment) {
    const { article } = comment;
    return this.articleService.findOne(article);
  }

  @ResolveField(returns => UserModel)
  async user(@Parent() comment) {
    const { user } = comment;
    return this.userService.findOne(user);
  }

  @Query(returns => [CommentModel])
  async comments(): Promise<CommentModel[]> {
    return await this.commentService.findAll();
  }

  @Mutation(returns => CommentModel)
  async createComment(
    @Args('comment') comment: CreateCommentDTO,
  ): Promise<CommentModel> {
    return await this.commentService.create(comment)
  }
}