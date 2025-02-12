import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartsModel } from './charts/chartsmodel';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private API_URL ="http://127.0.0.1:8000/compte/"

  constructor(private httpclient:HttpClient) { }
  getCompte():Observable<ChartsModel[]>{
    return this.httpclient.get<ChartsModel[]>(`${this.API_URL}compte/`)
  }
}
