export class UpdateTodoDTO {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {
    const { text, completedAt, id } = props;
    let newCompletedAt = completedAt;

    if (!id || isNaN(Number(id))) return ["Id invalido", undefined];

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === "Invalid Date") {
        return ["Ingresa una fecha valida", undefined];
      }
    }

    return [undefined, new UpdateTodoDTO(id, text, newCompletedAt)];
  }
}
