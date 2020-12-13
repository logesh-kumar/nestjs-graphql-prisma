import { Field, InputType } from '@nestjs/graphql';
import { IsDate, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;
}
