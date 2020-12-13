import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentToLesson } from './assignStudentsToLesson.Input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async lessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  // async updateLesson(id): Promise<Lesson> {
  //   const lesson = await this.lessonRepository.update();
  //   return this.lessonRepository.remove(lesson);
  // }

  async deleteLesson(id): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ id });
    return this.lessonRepository.remove(lesson);
  }

  async assignStudentToLesson(
    assignStudentToLesson: AssignStudentToLesson,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentToLesson;
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...(lesson?.students || []), ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
