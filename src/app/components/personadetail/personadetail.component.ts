import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonaService} from "../../services/persona.service";
import {Persona} from "../../interfaces/Persona";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-personadetail',
  templateUrl: './personadetail.component.html',
  styleUrls: ['./personadetail.component.css']
})
export class PersonadetailComponent implements OnInit{
  personaId?: number;
  mode: "NEW" | "UPDATE" = "NEW";
  persona: Persona = {id: 0, nombre: '', apellidos: '', email: '', rol: ''};
  isSaving: boolean = false;

  constructor(private route: ActivatedRoute, private personaService: PersonaService, private router: Router) {
  }

  ngOnInit() {
    const entryParam: string = this.route.snapshot.paramMap.get("id") ?? "new";
    if(entryParam != "new"){
      this.personaId = +this.route.snapshot.paramMap.get("id")!;
      this.mode = "UPDATE";
      this.getItemById(this.personaId!);
    }else{
      this.mode = "NEW";
    }
  }

  private getItemById(id: number){
    this.personaService.getById(id).subscribe({
      next: value => {
        this.persona = value;
      },
      complete: () => {
        console.log("Usuario cargado correctamente");
      }
    })
  }

  personaAction(form: NgForm){
    switch (this.mode){
      case "UPDATE":
        this.updatePersona(form);
        break;

      case "NEW":
        this.createPersona(form);
        break;
    }
  }

  private createPersona(form: NgForm) {
    if (form.valid) {
      this.personaService.createPersona(this.persona)
        .subscribe(
          (response: any) => {
            console.log('Usuario creado correctamente:', response);
            form.resetForm();
            this.persona = { id: 0, nombre: '', apellidos: '', email: '', rol: '' };
            this.router.navigateByUrl('/persona');
          },
          (error: any) => {
            console.error('Error al crear el usuario:', error);
          }
        );
    } else {
      console.error('El formulario no es válido');
    }
  }

  private updatePersona(form: NgForm){
    if (form.valid) {
      this.personaService.updatePersona(this.persona.id, this.persona)
        .subscribe(
          (response: any) => {
            console.log('Usuario actualizado correctamente:', response);
            form.resetForm();
            this.persona = { id: 0, nombre: '', apellidos: '', email: '', rol: '' };
            this.router.navigateByUrl('/persona');
          },
          (error: any) => {
            console.error('Error al actualizar el usuario:', error);
          }
        );
    } else {
      console.error('El formulario no es válido');
    }
  }

  cancel(){
    if (confirm('¿Estás seguro de que quieres cancelar?')) {
      console.log('Cancelado');
      this.router.navigateByUrl('/persona');
    }
  }

}
