import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentType])
  students() {
    return this.studentService.students();
  }

  @Query(() => StudentType)
  studentById(@Args('id') id: number) {
    return this.studentService.studentById(id);
  }

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Mutation(() => StudentType)
  deleteStudent(@Args('id') id: number) {
    return this.studentService.deleteStudent(id);
  }

  @Mutation(() => StudentType)
  assignLessonToStudent(
    @Args('studentId') studentId: number,
    @Args('lessonId') lessonId: number,
  ) {
    return this.studentService.assignLessonToStudent(studentId, lessonId);
  }
}
