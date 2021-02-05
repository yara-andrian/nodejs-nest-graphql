import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { UserModel } from '../user/user.model';
import {ArticleModel} from '../article/article.model'

@ObjectType()
@Entity('comment')
export class CommentModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => UserModel)
  @ManyToOne(type => UserModel, user => user.comments)
  user: UserModel

  @Field(type => ArticleModel)
  @ManyToOne(type => ArticleModel, article => article.comments)
  article: ArticleModel

  @Field()
  @Column('text')
  details: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}