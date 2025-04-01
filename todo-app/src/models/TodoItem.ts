export interface ITodoItem {
  title: string;
  isCompleted: boolean;
  id: number;
}

export class Todo implements ITodoItem {
  title: string;
  isCompleted: boolean;
  id: number;

  constructor(data?: any){
    this.title = data.title
    this.isCompleted = data.is_completed === 1
    this.id = data.id
  }
}