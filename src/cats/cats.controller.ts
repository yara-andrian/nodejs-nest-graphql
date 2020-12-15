import {Controller, Get, Post, Req, Body} from '@nestjs/common'
import {CreateCatDto} from './cats.dto'
import {Request} from 'express'
import { CatsService } from './cats.service'
import {Cat} from './cats.interface'

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService){}

  @Get()
  async findOne(@Req() request: Request): Promise<Cat[]> {
    return this.catsService.findAll()
  }

  @Post()
  create(@Body() body: CreateCatDto): string{
    return body.name
  }
}