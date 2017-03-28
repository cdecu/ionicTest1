import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

/* *********************************************************************************************************************
 flip flap game board tile
 */
export class GameTile {
  
  public frontState = 'back';
  public backState = 'front';
  
  constructor(public id : number, public turnedOn : boolean) {
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
    }
    
  }

/* *********************************************************************************************************************
 flip flap game board tile
 */
@Injectable()
export class GameBoard {
  
  public tiles : GameTile[] = [];
  
  /* *********************************************************************************************************************
   * Ionic make me singleton iff
   */
  constructor() {
    console.log('Hello GameBoard Provider');
    }
  
  /* *********************************************************************************************************************
   * Prepare tiles according to ...
   */
  recalcBoard(platform: Platform): boolean {
    console.log('GameBoard recalcBoard Platform width:',platform.width(),'height:',platform.height());
    //console.log(platform.win().screen);
    // Must match css board padding : .5px; + board-tile flex: 1 0 79.5px
    let NbCols = Math.floor(platform.width()  / 80.00);
    let NbRows = Math.floor(platform.height() / 80.00);
    if (NbCols<2) NbCols=2;
    let NbTiles = NbCols*NbRows;
    if (this.tiles.length === NbTiles) {
      console.log('Keep NbRows',NbRows,'NbCols',NbCols);
      return false;
      }
    console.log('Chg NbRows',NbRows,'NbCols',NbCols);
    //for (let i = this.tiles.length; i < NbTiles; i++) {
    //  this.tiles[i] = new GameTile(i+1,false);
    //  }
    //if (this.tiles.length > NbTiles) {
    //  this.tiles.splice(0,this.tiles.length-NbTiles);
    //  }
    //for (let i = 0; i < this.tiles.length; i++) {
    //  this.tiles[i].turnDown();
    //  }
    this.tiles = [];
    for (let i = 0; i < NbTiles; i++) {
      this.tiles[i] = new GameTile(i + 1, false);
      }
    return true;
    }
  
  /* *********************************************************************************************************************
   * Prepare tiles according to ...
   */
  public toggleTile(tile: GameTile): void {
    if (tile.turnedOn)
      tile.turnDown(); else
      tile.turnOn();
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].id != tile.id) {
        if (this.tiles[i].turnedOn) {
          //console.log('TurnOff ',this.tiles[i]);
          this.tiles[i].turnDown();
        }
      }
    }
  }
  
}
