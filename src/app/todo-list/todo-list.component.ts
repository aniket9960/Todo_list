import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoListService } from '../todo-list.service';
import { customTaskNameValidator } from '../validators/validator';
import { Router } from '@angular/router';

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
              private router : Router
  ){}
  
  allTask : any;
  i: number = 1;
  ngOnInit(){
    this.todoService.getAllTasks().subscribe({
      next: (response : any) => {
        this.allTask = response.response
      },
      error : (err : any) => {
        console.log("error");
        
        console.log(err)
      }
    });
  }

  taskFrom = this.formBuilder.group({
    task : ['',[Validators.required]]
  },
{
  validator : [customTaskNameValidator('task')]
});

  onSubmit(){
    alert(this.taskFrom.value.task);
    this.todoService.saveNewTask({name :this.taskFrom.value.task}).subscribe({
      next : (response : any) => {
        let result = response
        alert(result.message);
        //this.router.navigate([this.router.url]);
        location.reload();
        
      },
      error : (err : any)=>{
        console.log(err);
        
      }
    });
    
  };

  updateTask(taskId: any) {
    
    }





}
