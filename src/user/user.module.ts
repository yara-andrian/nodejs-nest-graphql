import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserModel } from './user.model';
import {ArticleModule} from '../article/article.module'
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [forwardRef(() => ArticleModule), forwardRef(() => CommentModule), TypeOrmModule.forFeature([UserModel])],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}