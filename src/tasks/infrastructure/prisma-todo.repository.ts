import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TodoRepository } from '../domain/repositories/todo-repository';
import { Todo } from '../domain/entities/todo';
import { Title } from '../domain/value-objects/title';

@Injectable()
export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(todo: Todo) {
    await this.prisma.todo.upsert({
      where: { id: todo.id },
      update: { title: todo.title, isDone: todo.done },
      create: { id: todo.id, title: todo.title, isDone: todo.done },
    });
  }

  /** Récupère un Todo par son id, ou null s’il n’existe pas */
  async findById(id: string): Promise<Todo | null> {
    const row = await this.prisma.todo.findUnique({ where: { id } });
    if (!row) return null;

    const todo = new Todo(row.id, Title.create(row.title));
    if (row.isDone) todo.complete();
    return todo;
  }

  /** Retourne tous les Todo sous forme d’objets domaine */
  async findAll(): Promise<Todo[]> {
    const rows = await this.prisma.todo.findMany();
    return rows.map((r) => {
      const todo = new Todo(r.id, Title.create(r.title));
      if (r.isDone) todo.complete();
      return todo;
    });
  }
}