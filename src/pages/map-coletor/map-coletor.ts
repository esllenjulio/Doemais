import { AlertProvider } from './../../providers/alert/alert';
import { ApiDataProvider } from './../../providers/api-data/api-data';
import { ApiEnderecoProvider } from './../../providers/api-endereco/api-endereco';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, ModalController, ModalOptions, Searchbar } from 'ionic-angular';
import leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';
import { StorageProvider } from '../../providers/storage/storage';
import { ModalPage } from '../modal/modal';

/**
 * Generated class for the MapColetorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map-coletor',
  templateUrl: 'map-coletor.html',
})
export class MapColetorPage {

  @ViewChild('map') mapContainer: ElementRef;
  @ViewChild("searchbar") searchbar: Searchbar;
  map: any;
  posLat: any;
  posLon: any;
  tipoPessoa: any = 2;
  pesquisar: boolean = false;
  iconBusca: any = "search";
  listasPontos: any = [];
  listasPontosEncontrados: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    private apiEnd: ApiEnderecoProvider,
    private geolocation: Geolocation,
    private apiData: ApiDataProvider,
    private alert: AlertProvider,
    private modal: ModalController) {
      this.carregar();
  }




  // CRIA O MAPA PRINCIPAL E PEGA A POSIÇAO ATUAL E MANDA CRIA OS PONTOS NO MAPA

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapColetorPage');

    // parte de codigo para iniciar o map 
    // this.map = leaflet.map("map").fitWorld();
    // this.map.zoomControl.setPosition('bottomright');
    // leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //   maxZoom: 20,
    //   // zoomControl: true
    // })
    //   .addTo(this.map);
    // this.map.locate({
    //   setView: true,
    //   maxZoom: 15
    // })
    // fim parte de codigo para iniciar o map 

    // this.loadmap();

   
  }




  carregar(){
    this.geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.posLat = pos.coords.latitude;
      this.posLon = pos.coords.longitude;
      alert('this.posLat : ' + this.posLat);
      alert('this.posLon: ' + this.posLon);
      // this.mostrarLocalizacaoAtual();

      // this.storage.getUserStorage()
      //   .then(
      //     (data: any) => {
      //       console.log(data);

      //       if (data == null) {
      //         this.tipoPessoa = 2;
      //         this.getEstadoCoordenadas(this.tipoPessoa, this.posLat, this.posLon);
      //       } else {
      //         this.tipoPessoa = 2;
      //         this.getEstadoCoordenadas(this.tipoPessoa, this.posLat, this.posLon);
      //       }
      //     });

    },
      err => {
        alert('Error message : ' + err.message);
      }

    ).catch( 
      (error)=>{alert(error)}
    );
  }

  // BUSCA NO PROVIDER AS COORDENADAS E ACORDO COM O ESTADO DO DOADOR CADASTRADO
  getEstadoCoordenadas(tipo, lat, lon) {
    this.apiEnd.getEstadoCoordenadas(lat, lon).then(
      (data: any) => {
        // console.log(data.features[0].properties.state)
        let estado = data.features[0].properties.state;
        this.apiData.getPessoaTipoEstado(tipo, estado).then(
          (d) => {
            this.listasPontos = [];
            this.listasPontos = d
            this.loadmap(d)
            console.log(d);
          },
          (error) => {
            console.log(error);
            alert("Falha ao buscar pontos de Coletas");
          }
        );
      },
      (error) => {
        alert("Falha ao buscar pontos de Coletas por estado");
      }
    )
  }


  //  ADICIONA TODOS OS PONTOS/MARKER NO MAPA
  loadmap(pontos: any) {
    let markerGroup = leaflet.featureGroup();
    var pulsingIcon = leaflet.icon.pulse({iconSize:[20,20],color:'red'});
    for (let i in pontos) {
      let marker: any = leaflet.marker([pontos[i].endereco.latitude, pontos[i].endereco.longitude], 
        {icon: pulsingIcon}
        ).on('click', () => {
        // Aqui chama o componente modal e manda as informaçaoes ponto para ser exibido na tela.
        const mod = this.modal.create(ModalPage, { dados: pontos[i] });
        mod.present();
      })
      marker.id = pontos[i].pessoaId;
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      // console.log(marker)
    }
  }



  //  CRIAR MAPA E ADICIONAR LOCALIÇÃO ATUAL - CRIA PONTO PERSONALIZADO
  mostrarLocalizacaoAtual() {
    var myIcon = leaflet.icon({
      iconUrl: 'https://leafletjs.com/docs/images/github-round.png',
      iconSize: [28, 65],
      iconAnchor: [12, 44],
      popupAnchor: [0, 0],
      // shadowUrl: 'https://leafletjs.com/docs/images/github-round.png',
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
    });
    var pulsingIcon = leaflet.icon.pulse({iconSize:[30,30],color:'green', fillColor:'green'});

    let marker: any = leaflet.marker([this.posLat, this.posLon],
      //  {icon: pulsingIcon}
    )
    // .on('click', () => {
    //   // alert('Marker clicked: ');
    //   // this.alert.presentActionSheet();
    //   const mod = this.modal.create(ModalPage);
    //   mod.present();
    // })

    let markerGroup = leaflet.featureGroup();
    markerGroup.addLayer(marker);
    this.map.addLayer(markerGroup);


  }



  // CONFIGURAÇOES DAS PESQUISAS NA TELA DO MAPA
  showPesquisa() {
    if (this.pesquisar) {
      this.iconBusca = 'search';
    } else {
      this.iconBusca = 'close';
      // this.searchbar.setFocus();
    }
    this.pesquisar = !this.pesquisar;
  }


  // LIMPAR CAMPO INPUT APÓS CLICAR EM LIMPAR
  cleared() {
    this.listasPontosEncontrados = [];
    return this.listasPontosEncontrados;
  }


  //BUSCAR NOMES PARA O AUTO COMPLET DA PESQUISA PEINCIPAL
  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.listasPontosEncontrados = this.listasPontos.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  // BUSCAR PONTO APÓS CLICAR EM ITEM DA LISTA DE PESQUISA PRINCIPAL
  buscarPontoMapa(item) {
    this.showPesquisa()
    this.map.panTo(new leaflet.LatLng(item.endereco.latitude, item.endereco.longitude));

  }


  minhaLocalizacao(){
    this.map.panTo(new leaflet.LatLng(this.posLat, this.posLon));
  }

  ionViewCanLeave() {
    // this.map.off();
    // this.map.remove();
    // document.getElementById("map").outerHTML = "";
    this.map.invalidateSize();
    console.log(this.map)
  }





  // this.map = leaflet.map("map").fitWorld();
  // this.map.zoomControl.setPosition('topright');

  // console.log(this.map)
  // leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //   maxZoom: 18,
  //   zoomControl: true
  // })
  //   .addTo(this.map);
  // this.map.locate({
  //   setView: true,
  //   maxZoom: 18
  // })
  // .on('locationfound', (e) => {
  //   console.log(e);

  // let markerGroup = leaflet.featureGroup();
  // for(let i in pontos){
  //   console.log(pontos)
  //   let marker: any = leaflet.marker([pontos[i].endereco.latitude, pontos[i].endereco.longitude]).on('click', () => {
  //     alert('Marker clicked: '+ pontos[i].email);
  //   })
  // markerGroup.addLayer(marker);
  //   this.map.addLayer(markerGroup);

  // }
  // })
  // .on('locationerror', (err) => {
  //   alert(err.message);
  // })


  // let marker: any = leaflet.marker([this.posLat, this.posLon]).on('click', () => {
  //   alert('Marker clicked: ');
  // })

}
