import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListInterface } from '../../domain/models/get-list.interface';
import { UserLoginRequestInterface } from '../../domain/models/user-login-request.interface';
import { UserLoginResponseInterface } from '../../domain/models/user-login-response.interface';
import { UserInterface } from '../../domain/models/user.interface';
import { enviroment } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private BASE_URL: string = enviroment.API;

  constructor( private http: HttpClient) {}
  
  userLogin(userLoginRequestInterface: UserLoginRequestInterface): Observable<UserLoginResponseInterface>{
    return this.http.post<UserLoginResponseInterface>(this.BASE_URL+"/login", userLoginRequestInterface);
  }

  getUsers(getListInterface: GetListInterface): Observable<UserInterface>{
    return this.http.post<UserInterface>(this.BASE_URL+"/user", getListInterface);
  }
  getUserById(userID: string): Observable<UserInterface>{
    console.log('userID : ', userID);
    return this.http.get<UserInterface>(this.BASE_URL+"/user/"+userID);
  }
  register(userInterface: UserInterface): Observable<UserInterface>{
    return this.http.post<UserInterface>(this.BASE_URL+"/user/register", userInterface);
  }
  createUser(userInterface: UserInterface): Observable<UserInterface>{
    return this.http.post<UserInterface>(this.BASE_URL+"/user/createUser", userInterface);
  }
  updateUser(userInterface: UserInterface): Observable<UserInterface>{
    return this.http.put<UserInterface>(this.BASE_URL+"/user/"+userInterface.id, userInterface);
  }
  deleteUser(userID: string): Observable<UserInterface>{
    return this.http.delete<UserInterface>(this.BASE_URL+"/user/"+userID);
  }

}
