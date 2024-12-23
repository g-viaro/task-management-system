import { Injectable } from '@angular/core';
import { Task } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  tasks: Task[] = [
    // {    
    //   id: 1,
    //   title: 'Test 1',
    //   description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    //   status: 'To Do',      
    // },
    
    // {    
    //   id: 2,  
    //   title: 'Test 2',
    //   description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    //   status: 'In Progress',      
    // }
  ]

  getTasks(): Task[] {
    return this.tasks.slice();
  }

  getTask(id: number): Task {
    return this.tasks.filter(task => task.id == id)[0] || null;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  updateTask(data: Task) {
    this.tasks.filter(task => task.id = data.id).map(task => task = data)    
  }

  deleteTask(id: number) {
    const index = this.tasks.findIndex(task => task.id == id);    
    this.tasks.splice(index, 1)    
  }
}
