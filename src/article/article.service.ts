import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ArticleModel } from './article.model';
import { CreateArticleDTO } from './article.dto';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(ArticleModel)
    private articleRepository: Repository<ArticleModel>,
    private userService: UserService
  ) { }

 async create(article: CreateArticleDTO): Promise<ArticleModel> {
    const user = await this.userService.findOne(article.user);

    return this.articleRepository.save({
      ...article,
      user
    } as any);

  }

  findAll(): Promise<ArticleModel[]> {
    return this.articleRepository.find();
  }

  findByUser(id: string): Promise<ArticleModel[]>{
    return this.articleRepository.createQueryBuilder("article")
    .where("article.user = :id", { id })
    .getMany();
  }

  findOne(id: string): Promise<ArticleModel> {
    return this.articleRepository.findOne(id);
  }
}