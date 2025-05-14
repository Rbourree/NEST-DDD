import { Todo } from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract save(todo: Todo): Promise<void>;
  abstract findById(id: string): Promise<Todo | null>;
  abstract findAll(): Promise<Todo[]>;
}
