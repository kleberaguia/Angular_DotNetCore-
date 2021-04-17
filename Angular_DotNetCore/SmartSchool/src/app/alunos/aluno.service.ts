import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aluno } from '../Models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  baseUrl = `${environment.UrlPrincipal}/Api/Aluno`;
  getAll():Observable<Aluno[]>{
    return this.http.get<Aluno[]>(`${this.baseUrl}`);
  }

  getbyId(id:number):Observable<Aluno>{
    return this.http.get<Aluno>(`${this.baseUrl}/${id}`);
  }

  post(aluno: Aluno){

    return this.http.post(`${this.baseUrl}`,aluno);

  }

  put(aluno: Aluno){
    return this.http.put(`${this.baseUrl}/alunoId?alunoId=${aluno.id}`,aluno);
  }

  delete(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
