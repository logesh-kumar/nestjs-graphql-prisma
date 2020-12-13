import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
