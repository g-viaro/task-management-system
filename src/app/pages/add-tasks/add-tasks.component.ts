import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrl: './add-tasks.component.css'
})
export class AddTasksComponent {

  constructor(private taskService: TaskService, private router: Router) { }
  
  private _snackBar = inject(MatSnackBar);

  formTask!: FormGroup;    

  // Forming error messages
  error_messages = {
    'title': [
      { type: 'required', message: 'Title is required!' },
    ],
    'status': [
      { type: 'required', message: 'Status is required!' },
    ],
  }

  ngOnInit(): void {

    // Creating the form with controls
    this.formTask = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
      status: new FormControl(null, Validators.required)      
    })

  }

  onSubmit() {

    // On submit retrieving the form data
    const task = {
      id: this.taskService.getTasks().length + 1,
      title: this.formTask.get('title')?.value,
      description: this.formTask.get('description')?.value,
      status: this.formTask.get('status')?.value
    }    

    // Adding the task
    this.taskService.addTask(task)

    // Snack bar for notification
    this._snackBar.open('Task added succcesfully!', 'Clear', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000
    });

    // Redirecting user to home
    this.router.navigate(['/'])

  }  

}