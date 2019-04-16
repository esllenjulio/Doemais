import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertProvider } from '../alert/alert';
import { Geolocation } from '@ionic-native/geolocation/';
import { ElementRef, ViewChild } from '@angular/core';
import { Searchbar, ModalController } from 'ionic-angular';
import leaflet from 'leaflet';
import { StorageProvider } from '../storage/storage';
import { ApiEnderecoProvider } from '../api-endereco/api-endereco';
import { ApiDataProvider } from '../api-data/api-data';
import { ModalPage } from '../../pages/modal/modal';

/*
  Generated class for the MapaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapaProvider {

  // @ViewChild('map') mapContainer: ElementRef;
  @ViewChild("searchbar") searchbar: Searchbar;
  public map: any;
  public posLat: any;
  public posLon: any;
  public tipoPessoa: any = 1;
  public pesquisar: boolean = false;
  public iconBusca: any = "search";
  public listasPontos: any = [];
  public listasPontosDoadores: any = [];
  public listasPontosColetores: any = [];
  public listasPontosEncontrados: any = [];
  public dadosUsuario: any = [];

  public showBtnMyLocation: boolean = false;
  public showBtnPesquisar: boolean = false;
  public showReload: boolean = false;
  public markerGroupColetores = leaflet.featureGroup();
  public markerGroupDoadores = leaflet.featureGroup();
  public markerGroupMylocation = leaflet.featureGroup();

  public selectedColetas: any = false;
  public selectedDoadores: any = false;

  constructor(public http: HttpClient,
    private alert: AlertProvider,
    private geolocation: Geolocation,
    public storage: StorageProvider,
    private apiEnd: ApiEnderecoProvider,
    private apiData: ApiDataProvider,
    private modal: ModalController
  ) {
    console.log('Hello MapaProvider Provider');
  }

  // METODO: Responsavél por pegar a localização atual pelo gps do dispositivo
  public carregar() {
    this.alert.showLoading("Buscando sua localização atual...");

    this.listasPontosColetores = [];
    this.listasPontosDoadores = [];
    var options = {
      timeout: 2000,
      enableHighAccuracy: true,
      maximumAge: 3600
    };
    console.log("aquiuii")
    this.geolocation.getCurrentPosition(options).then(
      pos => {
        this.showBtnPesquisar = true;
        this.showBtnMyLocation = true;
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.posLat = pos.coords.latitude;
        this.posLon = pos.coords.longitude;

       
        this.alert.hideLoading();

        this.storage.getUserStorage()
          .then(
            (data: any) => {
              console.log(data);
              this.dadosUsuario = [];
              this.dadosUsuario = data;
              if (data != null) {
                if (data.tipoPessoaId == 1) {
                  this.tipoPessoa = 1;
                  this.mostrarLocalizacaoAtual();
                  this.getEstadoCoordenadas(this.tipoPessoa, this.posLat, this.posLon);
                }
                if (data.tipoPessoaId == 2) {
                  this.tipoPessoa = 2;
                  this.mostrarLocalizacaoAtual();
                  this.getEstadoCoordenadas(this.tipoPessoa, this.posLat, this.posLon);
                }

              }
              else {  
                this.mostrarLocalizacaoAtual();
                // this.tipoPessoa = 1;
                // this.getEstadoCoordenadas(this.tipoPessoa, this.posLat, this.posLon);
              }
            });
      },
      err => {
        this.alert.showAlert();
        this.alert.hideLoading();
        this.showBtnPesquisar = false;
        this.showBtnMyLocation = false;
        this.showReload = true;
        // alert('Error message : ' + err.message);
      }
    ).catch(
      (error) => {
        // alert(error)
        this.alert.showAlert();
        this.alert.hideLoading();
        this.showBtnPesquisar = false;
        this.showBtnMyLocation = false;
        this.showReload = true;
      }
    );
  }


  // BUSCA NO PROVIDER AS COORDENADAS E ACORDO COM O ESTADO DO DOADOR CADASTRADO
  getEstadoCoordenadas(tipo, lat, lon) {
    this.alert.showLoading("Buscando locais em cidades de todo estado...");

    this.apiEnd.getEstadoCoordenadas(lat, lon).then(
      (data: any) => {
        let estado = data.features[0].properties.state;

        if (tipo == 1) {
          this.apiData.getPessoaTipoEstado(2, estado).then(
            (dados) => {
              this.listasPontosColetores = [];
              this.listasPontosColetores = dados;
              this.AddColetoresMapa();
              this.alert.hideLoading();
              this.selectedColetas = true;
              this.selectedDoadores = false;
              this.alert.presentToast("Foram encontrados " + this.listasPontosColetores.length + " pontos de coleta.")
            },
            (error) => {
              this.alert.showAlert("Desculpe...", "Ocorreu uma Falha ao buscar pontos de coleta!");
              this.alert.hideLoading();
            }
          );

        }
        if (tipo == 2) {

          this.apiData.getPessoaTipoEstado(1, estado).then(
            (dados) => {
              this.listasPontosDoadores = [];
              this.listasPontosDoadores = dados;
              this.AddDoadoresMapa();
              this.selectedColetas = false;
              this.selectedDoadores = true;
              this.alert.presentToast("Foram encontrados " + this.listasPontosDoadores.length + " doadores.")
            },
            (error) => {
              this.alert.showAlert("Desculpe...", "Ocorreu uma Falha ao buscar doadores!");
              this.alert.hideLoading();
            }
          );

          this.apiData.getPessoaTipoEstado(2, estado).then(
            (dados) => {
              this.listasPontosColetores = [];
              this.listasPontosColetores = dados;
              // this.AddColetoresMapa();
              this.alert.hideLoading();
              this.selectedColetas = true;
              this.selectedDoadores = false;
              this.alert.presentToast("Foram encontrados " + this.listasPontosColetores.length + " pontos de coleta.")

            },
            (error) => {
              this.alert.showAlert("Desculpe...", "Ocorreu uma Falha ao buscar pontos de coleta!");
              this.alert.hideLoading();
            }
          );


        }
      },
      (error) => {
        this.alert.showAlert("Desculpe...", "Ocorreu uma Falha ao buscar alguns pontos!");
        this.alert.hideLoading();
      }
    )
  }



  AddColetoresMapa() {
    this.map.removeLayer(this.markerGroupDoadores);
    this.map.removeLayer(this.markerGroupColetores);
    this.markerGroupDoadores._layers = [];
    this.markerGroupColetores._layers = [];
    this.listasPontos = [];
    this.listasPontos = this.listasPontosColetores;
    console.log(this.listasPontosColetores);
    var pulsingIcon = leaflet.icon.pulse({ iconSize: [10, 10], color: 'red' });
    var pulsingIcon2 = leaflet.icon.pulse({ iconSize: [10, 10], color: 'green', fillColor: 'green' });

    let pontos = this.listasPontosColetores;
   
    for (let i in pontos) {
      console.log(pontos[i].pessoaId , this.dadosUsuario.pessoaId)
      if (pontos[i].pessoaId == this.dadosUsuario.pessoaId) {
        let marker: any = leaflet.marker([pontos[i].endereco.latitude, pontos[i].endereco.longitude],
           { icon: pulsingIcon2 }
        ).on('click', () => {
          // Aqui chama o componente modal e manda as informaçaoes ponto para ser exibido na tela.
          const mod = this.modal.create(ModalPage, { dados: pontos[i] });
          mod.present();
        })
        this.markerGroupColetores.addLayer(marker);
        
      }else{
        let marker: any = leaflet.marker([pontos[i].endereco.latitude, pontos[i].endereco.longitude],
          { icon: pulsingIcon }
        ).on('click', () => {
          // Aqui chama o componente modal e manda as informaçaoes ponto para ser exibido na tela.
          const mod = this.modal.create(ModalPage, { dados: pontos[i] });
          mod.present();
        })
        this.markerGroupColetores.addLayer(marker);
      }
      // marker.id = pontos[i].pessoaId;
      this.map.addLayer(this.markerGroupColetores);
    }
  }



  AddDoadoresMapa() {
    this.map.removeLayer(this.markerGroupDoadores);
    this.map.removeLayer(this.markerGroupColetores);
    // this.map.removeLayer(this.markerGroupMylocation);
    this.markerGroupDoadores._layers = [];
    this.markerGroupColetores._layers = [];
    // this.markerGroupMylocation._layers = [];
    
  
    // let marker: any = leaflet.marker([this.dadosUsuario.endereco.latitude, this.dadosUsuario.endereco.longitude])
    // this.markerGroupMylocation.addLayer(marker);
    // this.map.addLayer(this.markerGroupMylocation);


    var pulsingIcon = leaflet.icon.pulse({ iconSize: [10, 10], color: 'green', fillColor: 'green' });
    console.log(this.listasPontosDoadores);
    this.listasPontos = [];
    this.listasPontos = this.listasPontosDoadores;
    let pontos = this.listasPontosDoadores;
    for (let i in pontos) {
      let marker: any = leaflet.marker([pontos[i].endereco.latitude, pontos[i].endereco.longitude],
        { icon: pulsingIcon }
      ).on('click', () => {
        // Aqui chama o componente modal e manda as informaçaoes ponto para ser exibido na tela.
        const mod = this.modal.create(ModalPage, { dados: pontos[i] });
        mod.present();
      })
      marker.id = pontos[i].pessoaId;
      this.markerGroupDoadores.addLayer(marker);
      this.map.addLayer(this.markerGroupDoadores);
    }
  }


  //  ADICIONA TODOS OS PONTOS/MARKER NO MAPA
  loadmap() {

  }



  //  CRIAR MAPA E ADICIONAR LOCALIÇÃO ATUAL - CRIA PONTO PERSONALIZADO
  mostrarLocalizacaoAtual() {
    this.map.removeLayer(this.markerGroupMylocation);
    this.markerGroupMylocation._layers = [];
    var myIcon = leaflet.icon({
      iconUrl: 'https://leafletjs.com/docs/images/github-round.png',
      iconSize: [28, 65],
      iconAnchor: [12, 44],
      popupAnchor: [0, 0],
    });

    let marker: any = leaflet.marker([this.posLat, this.posLon])
    this.markerGroupMylocation.addLayer(marker);
    this.map.addLayer(this.markerGroupMylocation);
  }

  reloadGeolocation() {
    // this.map = leaflet.map("map").fitWorld();
    this.map.zoomControl.setPosition('bottomright');
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 20,
      // zoomControl: true
    })
      .addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    })
    this.showReload = false;
    this.carregar();
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


  minhaLocalizacao() {
    this.map.panTo(new leaflet.LatLng(this.posLat, this.posLon));
  }

}
