import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, IonicApp} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GameService } from "../providers/game.service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make GameBoardPage the root (or first) page
  rootPage: any = 'HomePage';
  pages: Array<{ title: string, component: any }>;

  /** ******************************************************************************************************************
   *
   * @param platform
   * @param app
   * @param menu
   * @param statusBar
   * @param splashScreen
   * @param gameBoard
   */
  constructor(public platform: Platform,
              public app: IonicApp,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public gameBoard: GameService) {

    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'Hello', component: 'HomePage'},
      {title: 'Scores', component: 'ScoresPage'},
      {title: 'Help', component: 'ScoresPage'}
    ];
  }

  /** ******************************************************************************************************************
   *
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.hide();
      this.splashScreen.hide();
      this.gameBoard.recalcBoard(this.platform);
      });
    this.platform.resize.subscribe(() => {
      // Cordova app comes out from the background.
      if (this.gameBoard.recalcBoard(this.platform))
        this.restartGame();
      else
        this.menu.close();
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
    this.nav.popToRoot({});
    }

}
