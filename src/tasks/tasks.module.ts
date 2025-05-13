import { Module } from '@nestjs/common';
import { TaskController } from './interface/http/task.controlleur';
import { TaskService } from './application/task.service';
import { PrismaTodoRepository } from './infrastructure/prisma-todo.repository';
import { TodoRepository } from './domain/repositories/todo-repository';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    { provide: TodoRepository, useClass: PrismaTodoRepository },
  ],
  exports: [TodoRepository],
})
export class TasksModule {}
