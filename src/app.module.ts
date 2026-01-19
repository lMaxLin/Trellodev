import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ObjectionModule } from './objection/objection.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      ObjectionModule,
      AuthModule,
      UsersModule,
      ColumnsModule,
      CardsModule,
      CommentsModule,
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
