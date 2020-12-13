import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      // installSubscriptionHandlers: true,
      // sortSchema: true,
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
