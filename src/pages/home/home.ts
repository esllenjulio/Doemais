import { LoginPage } from './../login/login';
import { ApiDataProvider } from './../../providers/api-data/api-data';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
// import leaflet from 'leaflet';
import { StorageProvider } from '../../providers/storage/storage';
import { AlertProvider } from '../../providers/alert/alert';
import { MapaPage } from '../mapa/mapa';
import { DoacoesPage } from '../doacoes/doacoes';
import { ItensDoacaoPage } from '../itens-doacao/itens-doacao';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pessoas: any[] = [];


  tabDoador: any;
  tabLogin: any;
  tabColetor: any;
  tabDoacoes: any;
  tabItens: any;
  rootPage = "";


  showTabDoador: boolean = false;
  showTabColetor: boolean = false;


  constructor(public navCtrl: NavController,
    private apiProvider: ApiDataProvider,
    public storage: StorageProvider,
    public alertProvider: AlertProvider
  ) {
    this.tabColetor = MapaPage;
    this.tabDoacoes = DoacoesPage;
    this.tabItens = ItensDoacaoPage;
  

  }

  // buscarDoadores() {
  //   this.buscarPessoaTipo(1);
  // }

  // buscarReceptores() {
  //   this.buscarPessoaTipo(2);
  // }


  // buscarPessoaTipo(tipo: any) {

  //   this.apiProvider.getPessoaTipoEstado(tipo, "Ceara")
  //     .then(
  //       (data: any) => {
  //         console.log(data);
  //         this.pessoas = data;
  //       }
  //     )
  //     .catch(
  //       (err) => {
  //         alert(err)
  //         console.log(err);
  //       }
  //     )

  // }


  ionViewDidLoad() {

    this.verificarLoginUser();
  }


  ionViewDidEnter() {
    // this.loadmap();
    // this.verificarLoginUser();

  }








  verificarLoginUser() {
    this.storage.getUserStorage()
      .then(
        (data: any) => {
          console.log(data);

          if (data == null) {
            let confirm = this.alertProvider.showConfirmLogin();
            confirm.onDidDismiss((data) => {
              console.log(data)
              if (data) {
                this.navCtrl.push(LoginPage);
              }else{
                this.showTabColetor = true;
              }
            });
          } else {
            if (data.tipoPessoaId == 1) {
              this.showTabColetor = true
            }
            if (data.tipoPessoaId == 2) {
              this.showTabColetor = true;
              this.showTabDoador = true;
            }
          }
        });
  }


}
