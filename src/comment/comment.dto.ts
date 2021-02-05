import { InputType, Field } from "@nestjs/graphql";

export interface CommentDTO{
  details: string;
}

@InputType()
export class CreateCommentDTO{
@Field()
user: string;  
@Field()
article: string;
@Field()
details: string;
}