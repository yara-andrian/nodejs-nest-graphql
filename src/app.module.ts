import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import {UserModule} from './user/user.module'
import {CatsModule} from './cats/cats.module'
import { AppController } from './app.controller';
import {CatsController} from './cats/cats.controller'
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [
    CatsModule,
    InvoiceModule,
    CustomerModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      introspection: true,
      playground: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'godwinekuma',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'invoiceapp',
      entities: ['dist/**/*.model.js'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats')
  }

}
