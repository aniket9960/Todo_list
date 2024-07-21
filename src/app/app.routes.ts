import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { authGaurdGuard } from './auth-gaurd.guard';
//import { LoginComponent } from './login/login.component';

export const routes: Routes = [{
    path : "register", component : RegisterComponent
},
{
    path : "login", component : LoginComponent
},
{
    path : "todoList", component : TodoListComponent, title : "TO-DO List", canActivate : [authGaurdGuard]
},
{
    path : "", redirectTo :'login', pathMatch:'prefix'
}

];
