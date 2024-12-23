import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../shared/interface';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  private _snackBar = inject(MatSnackBar);

  formTask!: FormGroup;

  task?: Task

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

    // Retrieving url params
    this.route.params.subscribe(params => {
      const id = params['id'];

      // Retrieving task
      this.task = this.taskService.getTask(id);

      // If no task is retrieved return to home
      if (!this.task)
        this.router.navigate(['/'])

      // Setting value of task to the form
      this.formTask.setValue({
        title: this.task?.title,
        description: this.task?.description,
        status: this.task?.status
      })

    });

  }

  onSubmit() {

    // On submit setting task value with the data of form
    this.task!.title = this.formTask.get('title')?.value || '';
    this.task!.description = this.formTask.get('description')?.value || '';
    this.task!.status = this.formTask.get('status')?.value || '';

    // Updating task 
    this.taskService.updateTask(this.task!);

    // Snack bar for notification
    this._snackBar.open('Task edited succcesfully!', 'Clear', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000
    });

    // Return on home
    this.router.navigate(['/']);
  }

}
