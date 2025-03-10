import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './modules/cats/cats.controller';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
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
