import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { PatchTaskDto } from './dto/patch-task.dto';

export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
};

@Injectable()
export class TaskService {
  private readonly filePath = join(__dirname, '../../tasks.json'); 

  private async readTasksFromFile() {
    const data = await readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }
  private async writeTasksToFile(tasks: Task[]) {
    await writeFile(this.filePath, JSON.stringify(tasks, null, 2));
  }
  findAll() {
    return this.readTasksFromFile();
  }

  async findById(id: number) {
    const tasks = await this.readTasksFromFile();
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async create(dto: CreateTaskDto) {
    const tasks = await this.readTasksFromFile();
    const { title } = dto;

    const newTask = {
      id: tasks.length + 1,
      title,
      isCompleted: false,
    };

    if (!dto.title) {
      throw new BadRequestException('Title is required');
    } else if (dto.title.trim() === '') {
      throw new BadRequestException('Title cannot be empty or whitespace only');
    }

    tasks.push(newTask);
    await this.writeTasksToFile(tasks);

    return newTask;
  }

  async update(id: number, dto: UpdateTaskDto) {
    const tasks = await this.readTasksFromFile();
    const { title, isCompleted } = dto;

    const task = tasks.find((t) => t.id === id);

    task.title = title;
    task.isCompleted = isCompleted;

    await this.writeTasksToFile(tasks);

    return task;
  }

  async patchUpdate(id: number, dto: PatchTaskDto) {
    const tasks = await this.readTasksFromFile();
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    Object.assign(task, dto);
    await this.writeTasksToFile(tasks);

    return task;
  }

  async delete(id: number) {
    const tasks = await this.readTasksFromFile();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    tasks.splice(taskIndex, 1);
    await this.writeTasksToFile(tasks);

    return { success: true };
  }
}
