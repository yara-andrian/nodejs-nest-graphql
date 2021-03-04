import { Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';
import { InvoiceModel } from './../invoice/invoice.model';
import { InvoiceService } from '../invoice/invoice.service';
import { CustomerService } from './customer.service';
import { CustomerModel } from './customer.model';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
  ObjectType,
  Field,
  Context,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {
  createRefreshToken,
  createAccessToken,
  sendRefreshToken,
} from '../auth';
import { deleteToken } from 'src/sendRefreshToken';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => CustomerModel)
  customer: CustomerModel;
}

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

@Resolver((of) => CustomerModel)
export class CustomerResolver {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    @Inject(InvoiceService) private invoiceService: InvoiceService,
  ) {}

  @Query((returns) => CustomerModel)
  async customer(@Args('id') id: string): Promise<CustomerModel> {
    return await this.customerService.findOne(id);
  }
  @ResolveField((returns) => [InvoiceModel])
  async invoices(@Parent() customer) {
    const { id } = customer;
    return this.invoiceService.findByCustomer(id);
  }

  @Query((returns) => [CustomerModel])
  async customers(): Promise<CustomerModel[]> {
    return await this.customerService.findAll();
  }

  @Mutation((returns) => CustomerModel)
  async createCustomer(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('phone', { nullable: true }) phone: string,
    @Args('address', { nullable: true }) address: string,
    @Args('password') password: string,
  ): Promise<CustomerModel> {
    const hashedPassword = await hash(password, 12);

    return await this.customerService.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: { res: Response },
  ): Promise<LoginResponse> {
    const user = await this.customerService.findByEmail(email);

    if (!user) {
      throw new Error('could not find user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('bad password');
    }

    // login successful

    sendRefreshToken(context.res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      customer: user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: { res: Response }) {
    deleteToken(context.res, 'jid');

    return true;
  }
}
