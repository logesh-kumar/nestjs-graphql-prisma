import { Injectable } from '@nestjs/common';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LessonService {
  constructor(private readonly prismaService: PrismaService) {}

  async lessons(): Promise<Lesson[]> {
    return this.prismaService.lesson.findMany({
      include: {
        students: true,
      },
    });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = createLessonInput;
    return this.prismaService.lesson.create({
      data: {
        name,
        startDate,
        endDate,
      },
    });
  }

  async deleteLesson(id): Promise<Lesson> {
    return this.prismaService.lesson.delete({ where: { id } });
  }
}
