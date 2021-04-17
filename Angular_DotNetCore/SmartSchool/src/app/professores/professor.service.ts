import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Professor } from '../Models/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpClient) { }

  baseUrL = `${environment.UrlPrincipal}/Api/Professor`;

  getAll():Observable<Professor[]>{

      return this.http.get<Professor[]>(`${this.baseUrL}`);  
     
    }
  getbyId(id:number):Observable<Professor> {
    return this.http.get<Professor>(`${this.baseUrL}/${id}`)

  }
  post(prof:Professor){

    return this.http.post<Professor>(`${this.baseUrL}`,prof)

  }

  put(prof:Professor){

    return this.http.put<Professor>(`${this.baseUrL}/${prof.id}`,prof)

  }
  delete(id:number){
    return this.http.delete<Professor>(`${this.baseUrL}/${id}`)

  }

}
