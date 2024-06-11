import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Persona} from "../interfaces/Persona";
import {catchError, Observable, throwError} from "rxjs";
import {PersonaPage} from "../interfaces/PersonaPage";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private URI: string = "http://localhost:8080/rrhh/persona";

  constructor(private http:HttpClient) { }

  deletePersona(id: number){
    return this.http.delete(this.URI + "/" + id);
  }

  getById(id: number): Observable<Persona>{
    return this.http.get<Persona>(this.URI + "/" + id);
  }

  createPersona(persona: Persona):Observable<Persona>{
    return this.http.post<Persona>(this.URI, persona);
  }

  updatePersona(id: number, persona: Persona):Observable<Persona>{
    return this.http.put<Persona>(this.URI + "/" + id, persona);
  }

  getAllItemsFilter(page:number, size:number, filters?:string):Observable<PersonaPage[]>{
    let urlEndpoint: string = this.URI + "?page=" + page + "&size=" + size;
    if(filters){
      urlEndpoint = urlEndpoint + "&filter=" + filters;
    }
    return this.http.get<PersonaPage[]>(urlEndpoint);
  }
}
