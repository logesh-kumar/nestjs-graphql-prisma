import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService, //private studentService: StudentService,
  ) {}

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.lessons();
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  deleteLesson(@Args('id') id: number) {
    return this.lessonService.deleteLesson(id);
  }

  @Mutation(() => LessonType)
  updateLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.deleteLesson(createLessonInput);
  }
}
