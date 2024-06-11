import { Component } from '@angular/core';
import {PersonaService} from "../../services/persona.service";
import {Persona} from "../../interfaces/Persona";
import {faFilter, faSquarePen, faTrashCan} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-personalist',
  templateUrl: './personalist.component.html',
  styleUrls: ['./personalist.component.css']
})
export class PersonalistComponent {
  listaPersonas: Persona[] = [];
  filters = {
    nombre: '',
    apellidos: '',
    rol: ''
  };
  page:number = 0;
  size:number = 5;
  totalPages: number = 0;

  constructor(private personaService: PersonaService) {
    this.getAllItemsPagedFiltered();
  }

  filtered(){
    this.getAllItemsPagedFiltered();
  }

  deletePersona(id: number){
    this.personaService.deletePersona(id).subscribe({
      error: error => {
        console.error(error);
      },
      complete: () => {
        console.log("Persona con id: " + id + " eliminada correctamente");
        this.page = 0;
        this.getAllItemsPagedFiltered();
      }
    })
  }

  buildFilters(): string | undefined{
    let filtros: string[] = [];
    if (this.filters.nombre != '') {
      filtros.push("nombre:MATCH:" + this.filters.nombre);
    }
    if (this.filters.apellidos != '') {
      filtros.push("apellidos:MATCH:" + this.filters.apellidos);
    }
    if (this.filters.rol != '') {
      filtros.push("rol:MATCH:" + this.filters.rol);
    }
    if (filtros.length > 0) {
      return filtros.join(',');
    } else {
      return undefined;
    }
  }

  anterior(){
    if(this.page != 0){
      this.page = this.page - 1;
      this.getAllItemsPagedFiltered();
    }
  }

  siguiente(){
    if(this.page != (this.totalPages - 1)){
      this.page = this.page + 1;
      this.getAllItemsPagedFiltered();
    }
  }

  private getAllItemsPagedFiltered(): void {

    const filters:string | undefined = this.buildFilters();

    this.personaService.getAllItemsFilter(this.page, this.size, filters).subscribe({
      next: (data: any) => {
        this.listaPersonas = data.content;
        this.totalPages = data.totalPages;
        if(this.listaPersonas.length < 1){
          alert("No hay coincidencias");
          this.limpiarFiltrado();
        }
      },
      error: (error) => { console.error(error) }
    });
  }

  reset(){
    this.filters = {
      nombre: '',
      apellidos: '',
      rol: ''
    }
  }

  limpiarFiltrado(){
    this.reset();
    this.getAllItemsPagedFiltered();
  }

  protected readonly faSquarePen = faSquarePen;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faFilter = faFilter;
}
