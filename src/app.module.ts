import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middlewater';

@Module({
  // adding for nest-config 
  imports: [ConfigModule.forRoot({isGlobal: true}),UsersModule], 
  controllers: [AppController, UsersController],
  providers: [AppService,ConfigService, UsersService],
})
// enroll logger middleware 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
