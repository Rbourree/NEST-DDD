
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './tasks.service';
import { TodoRepository } from '../domain/repositories/todo.repository';
import { Todo } from '../domain/entities/todo.entity';
import { Title } from '../domain/value-objects/title.vo';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
    let taskService: TaskService;
    let todoRepository: jest.Mocked<TodoRepository>;

    beforeEach(async () => {
        const mockTodoRepository: Partial<TodoRepository> = {
            save: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TaskService,
                { provide: TodoRepository, useValue: mockTodoRepository },
            ],
        }).compile();

        taskService = module.get<TaskService>(TaskService);
        todoRepository = module.get(TodoRepository) as jest.Mocked<TodoRepository>;
    });

    describe('createTodo', () => {
        it('should create and save a new Todo', async () => {
            const rawTitle = 'Test Todo';
            const mockTodo = new Todo('1', Title.create(rawTitle));

            jest.spyOn(Todo.prototype, 'complete').mockImplementation(); // Mock the complete method
            todoRepository.save.mockResolvedValueOnce();

            const result = await taskService.createTodo(rawTitle);

            expect(result).toBeInstanceOf(Todo);
            expect(result.title).toBe(rawTitle);
            expect(todoRepository.save).toHaveBeenCalledWith(result);
        });
    });

    describe('listTodos', () => {
        it('should return a list of Todos', async () => {
            const mockTodos = [
                new Todo('1', Title.create('Todo 1')),
                new Todo('2', Title.create('Todo 2')),
            ];

            todoRepository.findAll.mockResolvedValueOnce(mockTodos);

            const result = await taskService.listTodos();

            expect(result).toEqual(mockTodos);
            expect(todoRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('completeTodo', () => {
        it('should mark a Todo as complete and save it', async () => {
            const mockTodo = new Todo('1', Title.create('Test Todo'));
            jest.spyOn(mockTodo, 'complete').mockImplementation(); // Mock the complete method

            todoRepository.findById.mockResolvedValueOnce(mockTodo);
            todoRepository.save.mockResolvedValueOnce();

            const result = await taskService.completeTodo('1');

            expect(result).toBe(mockTodo);
            expect(mockTodo.complete).toHaveBeenCalled();
            expect(todoRepository.save).toHaveBeenCalledWith(mockTodo);
        });

        it('should throw NotFoundException if Todo is not found', async () => {
            todoRepository.findById.mockResolvedValueOnce(null);

            await expect(taskService.completeTodo('1')).rejects.toThrow(NotFoundException);
            expect(todoRepository.findById).toHaveBeenCalledWith('1');
        });
    });
});