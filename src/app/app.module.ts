import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// MATERIAL

// COMMON
import { ModalComponent } from './common/modal/modal.component';
// COMMON

// PAGES
import { TasksComponent } from './pages/tasks/tasks.component';
import { AddTasksComponent } from './pages/add-tasks/add-tasks.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { HeaderComponent } from './common/header/header.component';
// PAGES

@NgModule({
  declarations: [
    AppComponent,               
    ModalComponent,        
    TasksComponent,
    AddTasksComponent,
    EditTaskComponent,
    HeaderComponent,      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,    
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,  
    MatTableModule,
    MatPaginatorModule,    
    MatSelectModule,        
    MatSortModule,
    MatSnackBarModule
  ],
  providers: [
    provideAnimationsAsync(),    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
