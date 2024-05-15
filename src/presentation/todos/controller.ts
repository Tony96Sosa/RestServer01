import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";

export class TodosController {
  // DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todosfind = await prisma.todo.findMany();
    res.json(todosfind);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json("Error id is NaN");

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    todo ? res.json(todo) : res.status(404).json("Error id not found");
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDTO.create(req.body);

    if (error) return res.status(400).json(error);

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDTO.update({ ...req.body, id });
    if (error) return res.status(400).json(error);

    const todo = await prisma.todo.findFirst({
      where: { id },
    });
    if (!todo) return res.status(404).json("Error id not found");

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    res.json(updateTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json("Error id is NaN");

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo) return res.status(404).json("Error id not found");
    const deleteTodo = await prisma.todo.delete({
      where: { id },
    });

    res.json(deleteTodo);
  };
}
