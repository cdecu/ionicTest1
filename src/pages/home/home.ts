import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.selectedItem = navParams.get('item');

    //this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [
      { title: 'Numbers', note: 'Just Random Numbers', icon: 'flask'}
     ,{ title: 'Greek Letters', note: 'Learn Greek Letters', icon: 'bluetooth'}
     ,{ title: 'Hebrew Letters', note: 'Learn Hebrew Letters', icon: 'wifi'}
     ,{ title: 'Contacts', note: 'Learn Contacts Phone Numbers', icon: 'boat'}
      ];
    }
  
  /* *********************************************************************************************************************
   * Goto wanted game
   */
  itemTapped(event, item) {
    this.navCtrl.push('PlayPage', {item: item});
    }
}
