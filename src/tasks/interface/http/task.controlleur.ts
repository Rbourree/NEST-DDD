import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TaskService } from '../../application/task.service';

@Controller('todos')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post()
  create(@Body('title') title: string) {
    return this.service.createTodo(title);
  }

  @Get()
  findAll() {
    return this.service.listTodos();
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.service.completeTodo(id);
  }
}
