import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http : HttpClient) { }

  getAllTasks(){
    return this.http.get('http://localhost:3000/tasks',{responseType: 'json'});
  }
  saveNewTask(body : any) {
    return this.http.post('http://localhost:3000/tasks/addTask',body);
  }

}
