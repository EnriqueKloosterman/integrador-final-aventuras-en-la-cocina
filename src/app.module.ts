import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { CommentsModule } from './comments/comments.module';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryProvider } from 'cloudinary/cloudinary.provider';
import { rootCertificates } from 'tls';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'aventuras_en_la_cocina',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule, 
    RecipesModule, 
    CommentsModule, 
    ArticlesModule, 
    CategoriesModule,
    TagModule, 
    AuthModule],
  controllers: [],
  providers: [CloudinaryProvider],
})
export class AppModule {}
