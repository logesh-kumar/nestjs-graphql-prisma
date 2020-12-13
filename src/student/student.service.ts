import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async students(): Promise<Student[]> {
    return this.prismaService.student.findMany();
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    return this.prismaService.student.create({
      data: {
        firstName,
        lastName,
      },
    });
  }

  async studentById(id): Promise<Student> {
    return await this.prismaService.student.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteStudent(id): Promise<Student> {
    return this.prismaService.student.delete({
      where: {
        id,
      },
    });
  }

  async getManyStudents(studentIds: number[]): Promise<Student[]> {
    return this.prismaService.student.findMany({
      where: {
        id: {
          in: studentIds,
        },
      },
    });
  }

  async assignLessonToStudent(
    studentId: number,
    lessonId: number,
  ): Promise<Student> {
    return this.prismaService.student.update({
      where: {
        id: studentId,
      },
      data: {
        lesson: {
          connect: {
            id: lessonId,
          },
        },
      },
    });
  }
}
