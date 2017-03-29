import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

/* *********************************************************************************************************************
 flip flap game board tile
 */
export class GameTile {
  
  public key : string;
  public frontState = 'back';
  public backState = 'front';
  public matched = false;
  
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

/* *********************************************************************************************************************
 flip flap game board tile
 */
@Injectable()
export class GameBoard {
  
  public tiles : GameTile[] = [];
  public firstPick?: GameTile = undefined;
  public secondPick?: GameTile = undefined;
  private timeoutID?: number = undefined;
  private UnMatchedPairs = 0;
  private isOver = false;
  private matches = 0;
  private moves = 0;
  
  
  /* *********************************************************************************************************************
   * Ionic make me singleton iff
   */
  constructor() {
    console.log('Hello GameBoard Provider');
    }
  
  /* *********************************************************************************************************************
   * New Game
   */
  newGame(): void {
    this.isOver = false;
    this.moves = 0;
    this.matches = 0;
    this.UnMatchedPairs = this.tiles.length / 2;
    this.firstPick = undefined;
    this.secondPick = undefined;
    clearTimeout(this.timeoutID);
    this.timeoutID=undefined;
    //this.tiles = shuffle(this.tiles);
    //cards.map(card=> {
    //  /** push the card twice with different ref */
    //  this.cards.push(card);
    //  this.cards.push(Object.assign({}, card));
    //});
    }
  
  /* *********************************************************************************************************************
   * Prepare tiles according to ...
   */
  recalcBoard(platform: Platform): boolean {
    // console.log('GameBoard recalcBoard Platform width:',platform.width(),'height:',platform.height());
    // Must match css board padding : .5px; + board-tile flex: 1 0 79.5px
    let NbCols = Math.floor(platform.width()  / 80.00);
    let NbRows = Math.floor(platform.height() / 80.00);
    if ((NbCols % 2)&&(NbRows % 2)) NbCols++;
    let NbTiles = NbCols*NbRows;
    if (this.tiles.length === NbTiles) {
      console.log('Keep NbRows',NbRows,'NbCols',NbCols);
      return false;
      }
    console.log('New Game NbRows',NbRows,'NbCols',NbCols);
    this.tiles = [];
    for (let i = 0; i < NbTiles; i++) this.tiles[i] = new GameTile(i + 1, false);
    this.newGame();
    return true;
    }
  
  /* *********************************************************************************************************************
   * Toggle clicked tile ...
   */
  public clickTile(tile: GameTile): void {
  
    if (this.secondPick) {
      console.log('TurnDown previous missmatch')
      this.firstPick.turnDown();
      this.secondPick.turnDown();
      this.firstPick = undefined;
      this.secondPick = undefined;
      }
    
    if (!tile || tile.turnedOn || (this.firstPick === tile) ) {
      console.log('Double click on firstPick ?')
      return;
      }

    if (!this.firstPick) {
      console.log('first Pick ! Turn On and Wait for the second pick')
      this.firstPick = tile;
      this.startTimeOut();
      tile.turnOn();
      return;
      }

    if (this.firstPick.key != tile.key) {
      console.log('Second pick is missmatched !')
      this.secondPick = tile;
      this.startTimeOut();
      tile.turnOn();
      this.moves++;
      return;
      }
   
    console.log('match ! ',this.UnMatchedPairs)
    this.moves++;
    this.matches++;
    this.UnMatchedPairs--;
    this.firstPick.match();
    this.firstPick = undefined;
    this.secondPick = undefined;
    clearTimeout(this.timeoutID);
    this.timeoutID=undefined;
    tile.match();
    if (!this.UnMatchedPairs)
      this.gameWin();
    return
    }
    
  /* *********************************************************************************************************************
   * TurnDown missmathed
   */
  public startTimeOut(): void {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      if (this.firstPick) this.firstPick.turnDown();
      if (this.secondPick) this.secondPick.turnDown();
      this.firstPick  = undefined;
      this.secondPick = undefined;
      }, 5000);
    }
  
  /* *********************************************************************************************************************
   * Game Win
   */
  public gameWin(): void {
    console.log('gameWin !')
    }
  
  /* *********************************************************************************************************************
   * Game Win
   */
  public gameOver(): void {
    console.log('gameOver !')
    }
    
  }
