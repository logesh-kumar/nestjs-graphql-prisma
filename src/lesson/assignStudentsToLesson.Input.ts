import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AssignStudentsToLesson {
  @Field(() => ID)
  lessonId: number;

  @Field(() => [ID])
  studentIds: number[];
}
