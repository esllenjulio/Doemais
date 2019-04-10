import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the MapDoadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map-doador',
  templateUrl: 'map-doador.html',
})
export class MapDoadorPage {

  dados:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient,
    public platform: Platform,
    public geolocation: Geolocation,
  ) {

    this.platform.ready().then(() => {
      alert("Iniciado");
      var options ={
        timeout:5000
      }
      // get current position
      geolocation.getCurrentPosition(options).then(pos => {
        alert('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.dados = pos
      }).catch(
        (error)=>{
          alert(error)
          this.dados = error
        }
      );

      // const watch = geolocation.watchPosition().subscribe(pos => {
      //   alert('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      // });

      // // to stop watching
      // watch.unsubscribe();

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapDoadorPage');
  }
  

  
}
