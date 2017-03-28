import { Component } from '@angular/core';
import { GameBoard } from "../../providers/game-board";


@Component({
  selector: 'board',
  templateUrl: 'board.html'
})
export class GameBoardPage {
  
  constructor(public gameBoard: GameBoard) {

  }
}
