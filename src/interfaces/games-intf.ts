import {Observable} from "rxjs/Observable";

/* *********************************************************************************************************************
 flip flap game board tile
 */
export class GameTile {
  
  public turnedOn = false;
  public frontState = 'back';
  public backState = 'front';
  public matched = false;
  
  constructor(public key : number, public frontText : string) {
  }
  
  public turnOn(): void {
    this.frontState='front';
    this.backState='back';
    this.turnedOn=true;
  }
  
  public turnDown(): void {
    this.frontState='back';
    this.backState='front';
    this.turnedOn=false;
    this.matched=false;
  }
  public delayedTurnDown(): void {
    this.frontState='delayedback';
    this.backState='delayedfront';
    this.turnedOn=false;
    this.matched=false;
  }
  
  public match(): void {
    this.frontState='front';
    this.backState='back';
    this.turnedOn=true;
    this.matched=true;
  }
  
}

// ..................................................................................................................
/**
 * IGameDataProvider
 */
export interface IGameDataProvider {
  generateData(NbTiles:number): Observable<Array<GameTile>>;
}

/* *********************************************************************************************************************
 * shuffle tiles ...
 */
export function shuffleTiles(tiles:GameTile[]): void {
  console.log('GameService shuffleTiles');
  for (let i = tiles.length - 1; i > 0; i--) {
    let j    = Math.floor(Math.random() * (i + 1));
    let temp = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = temp;
  }
}

