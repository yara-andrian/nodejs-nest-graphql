import { InputType, Field } from "@nestjs/graphql";

export interface ArticleDTO{
    title: string;
    description: string;
    tldr: string;
    context: string;
    crop: string;
    country: string;
}

@InputType()
export class CreateArticleDTO{
@Field()
user: string;  
@Field()
title: string;
@Field()	
description: string;
@Field()
tldr: string;
@Field()
context: string;
@Field()
crop: string;
@Field()
country: string;
}