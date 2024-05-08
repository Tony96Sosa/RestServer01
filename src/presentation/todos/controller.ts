import { Request, Response } from "express";

const todos = [
  { id: 1, text: "tony", completedAt: new Date() },
  { id: 2, text: "Sosa", completedAt: null },
  { id: 3, text: "Kurt", completedAt: new Date() },
];

export class TodosController {
  // DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json("Error id is NaN");
    const todo = todos.find((todo) => todo.id === id);

    todo ? res.json(todo) : res.status(404).json("Error id not found");
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json("Error text empty");
    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null,
    };
    todos.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json("Error id is NaN");
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json("Error todo not found");
    const { text, completedAt } = req.body;
    if (!text) return res.status(400).json("Error text empty");
    todo.text = text || todo.text;
    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));
    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json("Error id is NaN");
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json("Error todo not found");
    todos.splice(todos.indexOf(todo), 1);
    res.json(todo);
  };
}
