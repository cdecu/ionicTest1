import {Component, OnInit} from '@angular/core';
import {GameService, GameTile} from "../../providers/game.service";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'board',
  templateUrl: 'board.html',
})
export class GameBoardComponent implements OnInit {

  tiles$ : Observable<Array<GameTile>>;

  constructor(public gameService: GameService) {

  }

  ngOnInit(): void {
    console.log('GameBoardPage>OnInit:',this.gameService.selectedItem);
    this.tiles$ = this.gameService.tiles$;
  }

}
