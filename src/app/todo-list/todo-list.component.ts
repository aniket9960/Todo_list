import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  constructor(private formBuilder : FormBuilder){}

  taskFrom = this.formBuilder.group({
    task : ['',[Validators.required]]
  });

  onSubmit(){
    alert(this.taskFrom.value.task);
  };


}
