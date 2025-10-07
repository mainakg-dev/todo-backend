import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, title: string) {
    return this.prisma.todo.create({
      data: {
        title,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(userId: number, todoId: number, completed: boolean) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
    });
    if (!todo || todo.userId !== userId) {
      throw new NotFoundException('Todo not found');
    }
    return this.prisma.todo.update({
      where: { id: todoId },
      data: { completed },
    });
  }

  async remove(userId: number, todoId: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
    });
    if (!todo || todo.userId !== userId) {
      throw new NotFoundException('Todo not found');
    }
    await this.prisma.todo.delete({
      where: { id: todoId },
    });
    return { message: 'Todo deleted successfully' };
  }
}
