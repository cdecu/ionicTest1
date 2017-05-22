import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {IGameDataProvider, GameTile} from "../interfaces/games-intf";
import {GameNumbersProvider} from "./game-mumbers";
import {GameGreekLettersProvider} from "./game-greekLetters";

/* *********************************************************************************************************************
 flip flap game board tile
 */
@Injectable()
export class GameService {

  private NbTiles               = 9;
  private timeoutID?: number    = undefined;
  private UnMatchedPairs        = 0;
  private isOver                = false;
  private matches               = 0;
  private moves                 = 0;
  private firstPick?: GameTile  = undefined;
  private secondPick?: GameTile = undefined;

  public selectedItem: any;


  /* *********************************************************************************************************************
   * Ionic make me singleton iff
   */
  constructor(private http: Http) {
    console.log('Hello GameService Provider');
    }

  public get tiles$(): Observable<Array<GameTile>> {
    console.log('Build Tiles:',this.NbTiles);
    let dataProvider : IGameDataProvider = this.getdataProvider();
    let t$ = dataProvider.generateData(this.NbTiles);
    return t$;
    }

  /* *********************************************************************************************************************
   * Prepare tiles according to ...
   */
  public recalcBoard(platform: Platform): boolean {
    console.log('GameService recalcBoard Platform width:',platform.width(),'height:',platform.height());
    // Must match css board padding : .5px; + board-tile flex: 1 0 79.5px
    let NbCols = Math.floor(platform.width()  / 80.00);
    let NbRows = Math.floor(platform.height() / 80.00);
    if ((NbCols % 2)&&(NbRows % 2)) NbRows++;
    let Nb = NbCols*NbRows;
    if (this.NbTiles === Nb) {
      console.log('Keep NbRows',NbRows,'NbCols',NbCols,'Tiles',Nb);
      return false;
      }
    console.log('NbRows',NbRows,'NbCols',NbCols,'Tiles',Nb);
    this.NbTiles = Nb;
    this.resetGame();
    return true;
  }

  /* *********************************************************************************************************************
   * New Game, Reset counters
   */
  private resetGame(): void {
    console.log('Reset Game Tiles:',this.NbTiles);
    this.isOver = false;
    this.moves = 0;
    this.matches = 0;
    this.firstPick = undefined;
    this.secondPick = undefined;
    this.UnMatchedPairs = this.NbTiles / 2;
    clearTimeout(this.timeoutID);
    this.timeoutID=undefined;
    }
  

  /* *********************************************************************************************************************
   * shuffle tiles ...
   */
  private getdataProvider(): IGameDataProvider{
    console.log('getdataProvider');
    let s = 'Numbers';
    if (this.selectedItem){
      s=this.selectedItem.title || 'Numbers';
      }
    switch(s) {
      case 'Greek Letters':
        return new GameGreekLettersProvider(this.http);
      }
    return new GameNumbersProvider();
    }
  
  /* *********************************************************************************************************************
   * Toggle clicked tile ...
   */
  public clickTile(tile: GameTile): void {

    if (this.secondPick) {
      console.log('TurnDown previous missmatch');
      let dblClick = (this.firstPick === tile) || (this.secondPick === tile);
      this.firstPick.turnDown();
      this.secondPick.turnDown();
      this.firstPick = undefined;
      this.secondPick = undefined;
      if (dblClick)
        return;
      }

    if (!tile || tile.turnedOn || (this.firstPick === tile) ) {
      console.log('Double click on firstPick ?');
      return;
      }

    if (!this.firstPick) {
      console.log('first Pick ! Turn On and Wait for the second pick');
      this.firstPick = tile;
      this.startTimeOut();
      tile.turnOn();
      return;
      }

    if (this.firstPick.key != tile.key) {
      console.log('Second pick is missmatched !');
      this.secondPick = tile;
      this.startTimeOut();
      tile.turnOn();
      this.moves++;
      return;
      }

    console.log('match ! ',this.UnMatchedPairs);
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
