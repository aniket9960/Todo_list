import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoListService } from '../todo-list.service';
import { customTaskNameValidator } from '../validators/validator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  providers : [TodoListService]
})
export class TodoListComponent  implements OnInit{

  constructor(private formBuilder : FormBuilder,
              private todoService : TodoListService,
              private router : Router,
              private snackBar : MatSnackBar
  ){}
  
  allTask : any;
  i: number = 1;
  isEditMode: boolean = false;
  editTaskId: string | null = null;
  editTaskName: string | null = null;
  newTaskName : string | null = null; 
  
  ngOnInit(){
    this.loadTasks();
  }

  taskForm = this.formBuilder.group({
    task : ['',[Validators.required]]
  },
{
  validator : [customTaskNameValidator('task')]
});

successSnackBar(message:string){
  this.snackBar.open(message,'Close',{
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['success-snackbar']
  });
}

errorSnackBar(message : string){
  this.snackBar.open(message,'Close',{
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['centered-snackbar','error-snackbar']
  });
}

  loadTasks() {
    this.todoService.getAllTasks().subscribe({
      next: (response : any) => {
        this.allTask = response.response
      },
      error : (err : any) => {
        console.log(err)
        this.errorSnackBar("Something Went Wrong!");
      }
    });
  }

  onSubmit(){
    alert(this.taskForm.value.task);
    this.todoService.saveNewTask({name :this.taskForm.value.task}).subscribe({
      next : (response : any) => {
        let result = response
        //alert(result.message);
        this.successSnackBar(result.message);
        //this.router.navigate([this.router.url]);
        //location.reload();
        this.loadTasks();
      },
      error : (err : any)=>{
        console.log(err);
        this.errorSnackBar("Something Went Wrong!");
      }
    });
  };

  editTask(id:string,name:string)
  {
  console.log(id + "  " + name)
 
            this.taskForm.patchValue({
                task: name
            });
            // Enable edit mode
            this.isEditMode = true;
            this.editTaskId = id;
            
  };

  updateTask() {
    this.todoService.updateTask({id:this.editTaskId,name:this.newTaskName}).subscribe({
      next:(response:any) => {
        console.log(response);
        this.successSnackBar(response.message);
        this.isEditMode = false;
        this.editTaskId = null;
        this.newTaskName = null;
        this.loadTasks();

      },
      error: (err:any)=>{
        console.log(err);
        this.errorSnackBar("Something Went Wrong!");
        
      }
    });
    }

  updateStatus(event: Event, taskId: any) {
      if ((event.target as HTMLInputElement).checked) {
        // Checkbox is checked
        this.todoService.updateStatus({taskId,isComplete:true}).subscribe({
          next:(response : any) =>{
            console.log(response);
            this.successSnackBar(response.message);
            this.loadTasks();
          },
          error:(err:any)=>{
            console.log(err);
            this.errorSnackBar("Something Went Wrong!");
          }
        });
        //console.log('Checkbox is checked'+ taskId);
        
      } else {
        // Checkbox is unchecked
        this.todoService.updateStatus({taskId,isComplete:false}).subscribe({
          next:(response : any) =>{
            console.log(response);
            this.successSnackBar(response.message);
            this.loadTasks();
          },
          error:(err:any)=>{
            console.log(err);
            this.errorSnackBar("Something Went Wrong!");
          }
        });
        //console.log('Checkbox is unchecked' + taskId);
        
      }
  }

  DeleteTask(taskId: any) {
    this.todoService.deleteTask({taskId}).subscribe({
      next : (response : any) => {
        let result = response
        this.successSnackBar(result.message);
        //sessionStorage.setItem('showSnackbar', result.message);
        //alert(result.message);
        //this.router.navigate([this.router.url]);
        //location.reload();
        this.loadTasks();
      },
      error : (err : any)=>{
        console.log(err);
        this.errorSnackBar("Something Went Wrong!");
      }
    });
    }
}
