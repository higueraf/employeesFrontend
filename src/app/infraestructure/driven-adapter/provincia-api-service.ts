import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProvinciaInterface } from '../../domain/models/provincia.interface';
import { enviroment } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ProvinciaApiService {

  private BASE_URL: string = enviroment.API;

  constructor( private http: HttpClient) {}

  getProvinciasSelect(): Observable<ProvinciaInterface>{
    return this.http.get<ProvinciaInterface>(this.BASE_URL+"/provincias/select");
  }
  
}
