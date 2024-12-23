import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './pages/tasks/tasks.component';
import { AddTasksComponent } from './pages/add-tasks/add-tasks.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { HeaderComponent } from './common/header/header.component';

const routes: Routes = [
  { path: '', component: HeaderComponent, children: [
      { path: '', pathMatch: 'full', component: TasksComponent, data: { title: 'List' } },
      { path: 'add', component: AddTasksComponent, data: { title: 'Add Task' } },
      { path: ':id', component: EditTaskComponent, data: { title: 'Edit Task' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
