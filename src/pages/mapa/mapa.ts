import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import { MapaProvider } from '../../providers/mapa/mapa';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the MapColetorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  @ViewChild('map') mapContainer: ElementRef;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private mapaProvider: MapaProvider, private alertToast:AlertProvider) {
    this.mapaProvider.carregar();
  }


  // CRIA O MAPA PRINCIPAL E PEGA A POSIÇAO ATUAL E MANDA CRIA OS PONTOS NO MAPA

  ionViewDidLoad() {
    console.log(this.mapContainer);

    this.mapaProvider.map = leaflet.map(this.mapContainer.nativeElement).fitWorld();

    this.mapaProvider.map.zoomControl.setPosition('bottomleft');
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 20,
      // zoomControl: true
    })
      .addTo(this.mapaProvider.map);
    this.mapaProvider.map.locate({
      setView: true,
      maxZoom: 15
    })


  }

  ShowPontosColetas() {
    // alert("ShowPontosColetas");
    this.alertToast.presentToast("Foram encontrados "+ this.mapaProvider.listasPontosColetores.length +" pontos de coleta.")
    this.mapaProvider.AddColetoresMapa();
    this.mapaProvider.selectedColetas=true;
    this.mapaProvider.selectedDoadores=false;
  }
  
  ShowPontosDoadores() {
    // alert("ShowPontosColetas");
    this.alertToast.presentToast("Foram encontrados "+ this.mapaProvider.listasPontosDoadores.length +" doadores.")
    this.mapaProvider.AddDoadoresMapa();
    this.mapaProvider.selectedColetas=false;
    this.mapaProvider.selectedDoadores=true;
  }

  RemovePontosColetas(){
    this.mapaProvider.loadmap();
  }
}
