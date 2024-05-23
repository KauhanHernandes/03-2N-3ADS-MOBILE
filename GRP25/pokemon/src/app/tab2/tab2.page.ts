import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { Tab1Page } from '../tab1/tab1.page'; 

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemonData: any;
  pokemonTitleColor: string = 'black';
  pokemonStatus: string = '';
  
  constructor(public photoService: PhotoService, private pokeAPIService: PokeAPIService) {}

  ngOnInit() {
    this.loadRandomPokemon();
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
  }

  async loadRandomPokemon() {
    const pokemonResponse = await this.pokeAPIService.getPokeAPIService().toPromise();
    this.pokemonData = pokemonResponse;

    const tab1Abilities = Tab1Page.getAbilitiesCount(); 
    const tab2Abilities = this.pokemonData.abilities.length;

    if (tab2Abilities === tab1Abilities) {
      this.pokemonTitleColor = 'yellow';
      this.pokemonStatus = 'Empate';
    } else if (tab2Abilities > tab1Abilities) {
      this.pokemonTitleColor = 'red';
      this.pokemonStatus = 'Ganhou';
    } else {
      this.pokemonTitleColor = 'green';
      this.pokemonStatus = 'Perdeu';
    }
  }
}