import { StorageProvider } from './../../providers/storage/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  latitude:any;
  latitudeAtual:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:StorageProvider, private geolocation: Geolocation) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    this.getProdutos();
    this.carregar();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }




  getProdutos(){

    this.storage.getUserStorage()
    .then(
      (data: any) => {
        console.log(data);
  
        if (data == null) {
          
        } else {
         
        }
      });
  }


  carregar(){
    this.geolocation.getCurrentPosition().then((resp) => {
      alert(resp.coords.latitude)
      this.latitude = resp.coords.latitude;
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       alert('Error getting location:'+ error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
       alert(data.coords.latitude)
       this.latitudeAtual = data.coords.latitude
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }
}
