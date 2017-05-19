import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GameService, GameTile} from "../../providers/game.service";

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

  @Input() tile : GameTile;
  public get frontState(): string { return this.tile.frontState};
  public get backState(): string { return this.tile.backState};
  public get frontText(): string { return this.tile.frontText};
  public get id(): number { return this.tile.id};

  constructor(private gameService: GameService ) {
    }

  Toggle(): void {
    // console.log('Toggle ',this._tile);
    this.gameService.clickTile(this.tile);
    }

}
