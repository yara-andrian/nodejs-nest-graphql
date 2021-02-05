import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreateArticleDTO } from './article.dto';
import { UserService } from '../user/user.service';
import { ArticleModel } from './article.model';
import {ArticleService} from './article.service';
import { UserModel } from 'src/user/user.model';
import { CommentModel } from 'src/comment/comment.model';
import { CommentService } from 'src/comment/comment.service';

@Resolver(of => ArticleModel)
export class ArticleResolver {
  constructor(
    @Inject(ArticleService) private articleService: ArticleService,
    @Inject(UserService) private userService: UserService,
    @Inject(CommentService) private commentService: CommentService
  ) { }

  @Query(returns => ArticleModel)
  async article(@Args('id') id: string): Promise<ArticleModel> {
    return await this.articleService.findOne(id);
  }

  @ResolveField(returns => [CommentModel])
  async comments(@Parent() article) {
    const { id } = article;
    const response = this.commentService.findByArticle(id)
    return response;
  }

  @ResolveField(returns => UserModel)
  async user(@Parent() article) {
    const { user } = article;
    return this.userService.findOne(user);
  }

  @Query(returns => [ArticleModel])
  async articles(): Promise<ArticleModel[]> {
    return await this.articleService.findAll();
  }

  @Mutation(returns => ArticleModel)
  async createArticle(
    @Args('article') article: CreateArticleDTO,
  ): Promise<ArticleModel> {
    return await this.articleService.create(article)
  }
}