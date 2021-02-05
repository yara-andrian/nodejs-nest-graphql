import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import {ArticleService} from '../article/article.service';
import { CommentModel } from './comment.model';
import { CreateCommentDTO } from './comment.dto';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentModel)
    private commentRepository: Repository<CommentModel>,
    private articleService: ArticleService,
    private userService: UserService
  ) { }

 async create(comment: CreateCommentDTO): Promise<CommentModel> {
    const user = await this.userService.findOne(comment.user);
    const article = await this.articleService.findOne(comment.article)

    return this.commentRepository.save({
      ...comment,
      user,
      article
    } as any);

  }

  findAll(): Promise<CommentModel[]> {
    return this.commentRepository.find();
  }

  findByUser(id: string): Promise<CommentModel[]>{
    return this.commentRepository.createQueryBuilder("comment")
    .where("comment.user = :id", { id })
    .getMany();
  }

  findByArticle(id: string): Promise<CommentModel[]>{
    return this.commentRepository.createQueryBuilder("comment")
    .where("comment.article = :id", { id })
    .getMany();
  }

  findOne(id: string): Promise<CommentModel> {
    return this.commentRepository.findOne(id);
  }
}