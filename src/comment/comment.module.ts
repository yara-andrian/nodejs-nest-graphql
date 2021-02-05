import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentModel } from './comment.model';

@Module({
  imports: [TypeOrmModule.forFeature([CommentModel]), forwardRef(() => UserModule), forwardRef(() => ArticleModule)],
  providers: [CommentService, CommentResolver],
  exports: [CommentService]
})
export class CommentModule {}