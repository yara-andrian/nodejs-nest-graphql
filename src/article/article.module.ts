import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { ArticleModel } from './article.model';
import { CommentModule } from '../comment/comment.module'

@Module({
  imports: [TypeOrmModule.forFeature([ArticleModel]), forwardRef(() => UserModule), forwardRef(() => CommentModule)],
  providers: [ArticleService, ArticleResolver],
  exports: [ArticleService]
})
export class ArticleModule {}