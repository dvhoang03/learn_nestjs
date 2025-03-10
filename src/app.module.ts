import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './modules/cats/cats.controller';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password: '12345',
      database: 'learn_nestjs',
      autoLoadEntities:true,
      synchronize:true,
    }),
    CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  constructor(private dataSource: DataSource){};

  // cấu hình middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {path: 'cats', method: RequestMethod.GET},
        // {path: 'cats', method: RequestMethod},
        'cats/{*splat}'
      )
      .forRoutes(CatsController)
  }
}
