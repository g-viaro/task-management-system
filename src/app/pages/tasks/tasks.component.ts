import { Component, inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { ModalComponent } from '../../common/modal/modal.component';
import { Task } from '../../shared/interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  private _snackBar = inject(MatSnackBar);

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  columns = ['title', 'description', 'status', 'actions'];
  data!: MatTableDataSource<Task>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tasks: Task[] = [];

  titleFilter = new FormControl();
  statusFilter = new FormControl();

  filteredValues = { title: '', status: '' };

  loading: boolean = false;

  ngOnInit() {

    // Start loading for skeleton
    this.loading = true;
    this.tasks = [];
    this.data = new MatTableDataSource<Task>(this.tasks);

    // Retrieve data
    this.getData();

  }

  async getData() {

    // Deleay retrieving the data
    await this.delay(1000);

    this.loading = false;

    // Retrieving the data from the service
    this.tasks = this.taskService.tasks;

    // Implementig the data to the mat table
    this.data.data = this.tasks;
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;

    // On input filter change apply filter to the table
    this.titleFilter.valueChanges.subscribe((value) => {
      this.filteredValues['title'] = value;
      this.data.filter = JSON.stringify(this.filteredValues);
    });

    // On input filter change apply filter to the table
    this.statusFilter.valueChanges.subscribe((value) => {
      this.filteredValues['status'] = value;
      this.data.filter = JSON.stringify(this.filteredValues);
    });

    this.data.filterPredicate = this.filtri();

  }

  filtri() {

    // Custom filtering 
    return (data: Task, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      return data.title.toString().trim().toLowerCase().indexOf(searchString.title.toLowerCase()) !== -1 && data.status.toString().trim().toLowerCase().indexOf(searchString.status.toLowerCase()) !== -1
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onClearFilter() {
    this.data.filter = '';
    this.titleFilter.setValue('');
    this.statusFilter.setValue('');
  }

  onDelete(id: number, title: string) {

    let dialog_response = false;

    // Open custom modal with custom data
    let dialogRef = this.dialog.open(ModalComponent, { data: { text: "<p>You are about to eliminate the task: " + title + ". <br><br><strong>Are you sure, you want to continue?</strong><p>", text_button: 'Proceed', text_close_button: 'Close', action_ok: () => { }, action_chiudi: () => { } } });
    dialogRef?.afterClosed().subscribe({
      next: (data) => dialog_response = data,
      complete: () => {

        // If the user acceptedd proceed
        if (dialog_response) {

          // Delete task
          this.taskService.deleteTask(id)

          // Snack bar for notification
          this._snackBar.open('Task deleted succcesfully!', 'Clear', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000
          });

          this.loading = true

          this.getData();
        }

      }
    })

  }

}
