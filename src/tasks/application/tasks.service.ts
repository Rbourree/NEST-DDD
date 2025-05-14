import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../domain/repositories/todo.repository';
import { Todo } from '../domain/entities/todo.entity';
import { Title } from '../domain/value-objects/title.vo';
import { randomUUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskService {
    constructor(private readonly todoRepository: TodoRepository) { }

    async createTodo(rawTitle: string) {
        const todo = new Todo(randomUUID(), Title.create(rawTitle));
        await this.todoRepository.save(todo);
        return todo;
    }

    async listTodos() {
        return this.todoRepository.findAll();
    }

    async completeTodo(id: string) {
        const todo = await this.todoRepository.findById(id);
        if (!todo) throw new NotFoundException('Todo introuvable');
        todo.complete();
        await this.todoRepository.save(todo);
        return todo;
    }
}