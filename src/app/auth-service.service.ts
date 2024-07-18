import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http : HttpClient) { }

  register(body : any){
    return this.http.post('/auth/register',body);
  }

  login(username : string, password : string ){
    return this.http.post('/auth/login',{username,password});
  }

}
