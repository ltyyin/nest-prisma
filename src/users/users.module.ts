import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashPasswordMiddleware } from 'src/middlewares/hash-password.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  // 使用中间件
  // 接收一个参数，来实现中间件的。
  configure(consumer: MiddlewareConsumer) {
    // 使用EncryptMiddleware这个中间件，并表明在哪个constructor中使用(控制器中的参数路由)
    consumer.apply(HashPasswordMiddleware).forRoutes('users/regist');
  }
}
