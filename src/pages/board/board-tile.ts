import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GameBoard, GameTile} from "../../providers/game-board";

/* *********************************************************************************************************************
  flip flap game board tile
 see https://angular.io/docs/ts/latest/guide/animations.html#!#states-and-transitions
*/
@Component({
  selector: 'board-tile',
  templateUrl: 'board-tile.html',
  animations: [trigger('flipflap',
    [
    state('back, void', style({ transform: 'rotateY(180deg)' })),
    state('front', style({ transform: 'rotateY(0deg)' })),
    transition('front <=> back', [animate('0.85s ease-in')]),
    ])]
})
export class BoardTileComponent {
  
  _tile : GameTile;

  @Input() set tile(value: GameTile) {
    this._tile = value;
    };
  get tile(): GameTile {
    return this._tile;
    }
  get frontState(): string {
    return this._tile.frontState;
    }
  get backState(): string {
    return this._tile.backState;
    }
  get id(): number {
    return this._tile.id;
    }

  constructor(private gameBoard: GameBoard ) {
    }

  turnOn(): void {
    this.turnOn();
    }
  
  turnDown(): void {
    this.turnDown();
    }

  Toggle(): void {
    //console.log('Toggle ',this._tile);
    this.gameBoard.clickTile(this._tile);
    }

}
