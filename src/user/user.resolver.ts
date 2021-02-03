import { UserService } from './user.service';
import { UserModel } from './user.model';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

@Resolver(of => UserModel)
export class UserResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
  ) { }

  @Query(returns => UserModel)
  async user(@Args('id') id: string): Promise<UserModel> {
    return await this.userService.findOne(id);
  }

  @Query(returns => [UserModel])
  async users(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Mutation(returns => UserModel)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('phone', { nullable: true }) phone: string,
    @Args('address', { nullable: true }) address: string,
  ): Promise<UserModel> {
    return await this.userService.create({ name, email, phone, address })
  }
}