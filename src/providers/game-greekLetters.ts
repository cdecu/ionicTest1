import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {IGameDataProvider, GameTile, shuffleTiles} from "../interfaces/games-intf";

export class GameGreekLettersProvider implements IGameDataProvider{
  
  constructor(private http: Http) {
    //console.log('Hello GreekLetters Provider');
    }
  
  generateData(NbTiles:number): Observable<Array<GameTile>>{
    return this.http.get('../assets/data/greekLetters.json')
        .map(function(res) : Array<GameTile> {
          //console.log('Build Tiles$:',NbTiles);
          let tiles : GameTile[] = [];
          let c = (NbTiles / 2);
          for (let i = 0; i < c ; i++)
            tiles[i] = new GameTile(i,'');

          let dispoLetters : Array<string> = res.json();
          while (dispoLetters.length<c)
            dispoLetters=dispoLetters.concat(dispoLetters);
          for (let i = 0, j = 0; i < c; i++) {
            j = Math.floor(Math.random() * (c + 1));
            tiles[i].frontText = dispoLetters[j];
            dispoLetters.splice(j,1);
            }
  
          for (let i = 0; i < c ; i++)
            tiles[c+i] = new GameTile(tiles[i].key,tiles[i].frontText);
  
          shuffleTiles(tiles);
          return tiles;
          });
    };
  
}
