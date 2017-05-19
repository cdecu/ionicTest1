import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GameService } from "../providers/game.service";
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GameService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
