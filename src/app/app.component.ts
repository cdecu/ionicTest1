import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GameBoard } from "../providers/game-board";
import { GameBoardPage } from '../pages/board/board';
import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  
  // make GameBoardPage the root (or first) page
  rootPage: any = GameBoardPage;
  pages: Array<{ title: string, component: any }>;
  
  /** ******************************************************************************************************************
   *
   * @param platform
   * @param menu
   * @param statusBar
   * @param splashScreen
   * @param gameBoard
   */
  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public gameBoard: GameBoard) {
    
    this.initializeApp();
    
    // set our app's pages
    this.pages = [
      {title: 'Hello Ionic', component: GameBoardPage},
      {title: 'My First List', component: ListPage}
    ];
  }
  
  /** ******************************************************************************************************************
   *
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //console.log(this.platform.versions());
      //console.log(this.platform.win());
      this.gameBoard.recalcBoard(this.platform);
    });
    this.platform.resize.subscribe(() => {
      // Cordova app comes out from the background.
      this.gameBoard.recalcBoard(this.platform);
      this.restartGame();
    });
  }
  
  /** ******************************************************************************************************************
   *
   * @param page
   */
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  
  /** ******************************************************************************************************************
   *
   */
  restartGame() {
    console.log('restartGame');
    //console.log(this.platform.win());
    //this.nav.goToRoot({});
    }
  
}