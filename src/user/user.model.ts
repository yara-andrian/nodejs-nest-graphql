import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import {ArticleModel} from '../article/article.model'
import {CommentModel} from '../comment/comment.model'
@ObjectType()
@Entity()
export class UserModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field()
  @Column('text', { nullable: false })
  email: string;

  @Field()
  @Column('varchar', { length: 15 })
  phone: string;

  @Field()
  @Column('text')
  address: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(type => [ArticleModel], { nullable: true })
  @OneToMany(type => ArticleModel, article => article.user)
  articles: ArticleModel[]

  @Field(type => [CommentModel], { nullable: true })
  @OneToMany(type => CommentModel, comment => comment.user)
  comments: CommentModel[]
}