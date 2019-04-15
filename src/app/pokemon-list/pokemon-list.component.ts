import { Component, OnInit, ContentChild } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @ContentChild(NgbPagination) pagination: NgbPagination;
  totalItems: any;
  page: 1;
  previousPage: any;
  Pokemon: any = [];
  favorites = [];

  offset: 0;

  constructor(
    public restApi: RestApiService,
    public local: LocalStorageService
  ) { }

  KEY = 'pokemon';
  value: any = null;

  // this method update favorites array and localStorage
  set(name) {
    if (this.isFavorite(name)) {
      this.favorites.splice( this.favorites.indexOf(name), 1 );
    } else {
      this.favorites.push(name);
    }

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  ngOnInit() {
    this.loadPokemons(1, 20);
    this.favorites = (JSON.parse(localStorage.getItem('favorites'))) === null
                        ? []
                        : (JSON.parse(localStorage.getItem('favorites')));
  }

  // calls the api to list pokemons and for each item, calls the method to capture the specific attributes of each pokemon
  loadPokemons(offset, size) {
    // Pokemon API uses offset mode of pagination
    offset = (offset - 1) * size;

    return this.restApi.getPokemons(offset).subscribe((data: { }) => {
      this.Pokemon = data;
      this.Pokemon.results.forEach( (myObject, index) => {
        console.log(this.Pokemon.results[index].name);
        this.restApi.getPokemon(this.Pokemon.results[index].name).subscribe((newData: { }) => {
          console.log(newData);
          this.Pokemon.results[index] = newData;
        });
      });
    });
  }

  // this method toggle favorite state of pokemon by name
  addToFavorites(name) {
    this.set(name);
  }

  // this method verify if the name of pokemon is inside the favorites array
  isFavorite(name) {
    if (this.favorites) {
      return this.favorites.includes(name);
    }
    return false;
  }
}
