import { Title } from '../value-objects/title';

export class Todo {
  private isDone = false;

  constructor(
    readonly id: string,
    private _title: Title,
  ) {}

  complete() {
    this.isDone = true;
  }

  get title()  { return this._title.toString(); }
  get done()   { return this.isDone; }

  changeTitle(newTitle: Title) {
    this._title = newTitle;
  }
}