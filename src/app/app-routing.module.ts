import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pokemon-list' },
  { path: 'pokemon-list', component: PokemonListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
