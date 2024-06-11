import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonalistComponent} from "./components/personalist/personalist.component";
import {PersonadetailComponent} from "./components/personadetail/personadetail.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "persona",
    pathMatch: "full"
  },
  {
    path: "persona",
    component: PersonalistComponent
  },
  {
    path: "persona/:id",
    component: PersonadetailComponent
  },
  {
    path: "**",
    redirectTo: "persona"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
