import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  items: Array<{key: string, title: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.selectedItem = navParams.get('item');

    this.items = [
      { key: 'Numbers'             , title: 'Random Numbers'                 , icon: 'flask'}
     ,{ key: 'GreekLetters'        , title: 'Greek Letters'                  , icon: 'bluetooth'}
     ,{ key: 'GreekLeeterVsName'   , title: 'Greek Letters vs Latin Name'    , icon: 'bluetooth'}
     ,{ key: 'HebrewLetters'       , title: 'Hebrew Letters'                 , icon: 'wifi'}
     ,{ key: 'HebrewLetterVsName'  , title: 'Hebrew Letters vs Latin Name'   , icon: 'wifi'}
     ,{ key: 'Phone Numbers'       , title: 'Contacts Phone Numbers'         , icon: 'boat'}
     ,{ key: 'Contacts'            , title: 'Contacts Phone Numbers vs Image', icon: 'boat'}
      ];
    }
  
  /* *********************************************************************************************************************
   * Goto wanted game
   */
  itemTapped(event, item) {
    this.navCtrl.push('PlayPage', {item: item});
    }
}
