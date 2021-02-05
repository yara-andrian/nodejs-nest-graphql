import { UserModel } from '../user/user.model';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { CommentModel } from 'src/comment/comment.model';
@ObjectType()
@Entity('article')
export class ArticleModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  title: string;

  @Field()
  @Column('text', { nullable: false })
  description: string;

  @Field()
  @Column('text', { nullable: false })
  crop: string;

  @Field()
  @Column('text', { nullable: false })
  country: string;

  @Field()
  @Column('text', { nullable: false })
  tldr: string;

  @Field()
  @Column('text', { nullable: false })
  context: string;

  @Field(type => UserModel)
  @ManyToOne(type => UserModel, user => user.articles)
  user: UserModel

  @Field(type => [CommentModel], { nullable: true })
  @OneToMany(type => CommentModel, comment => comment.article)
  comments: CommentModel[]

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;
  
  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}