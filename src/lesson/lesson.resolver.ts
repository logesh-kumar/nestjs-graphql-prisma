import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentToLesson } from './assignStudentsToLesson.Input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
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
  deleteLesson(@Args('id') id: string) {
    return this.lessonService.deleteLesson(id);
  }

  @Mutation(() => LessonType)
  updateLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.deleteLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentToLesson') assignStudentToLesson: AssignStudentToLesson,
  ) {
    return this.lessonService.assignStudentToLesson(assignStudentToLesson);
  }

  @ResolveField()
  students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
