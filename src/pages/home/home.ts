import { LoginPage } from './../login/login';
import { ApiDataProvider } from './../../providers/api-data/api-data';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
// import leaflet from 'leaflet';
import { StorageProvider } from '../../providers/storage/storage';
import { AlertProvider } from '../../providers/alert/alert';
import { MapDoadorPage } from '../map-doador/map-doador';
import { MapColetorPage } from '../map-coletor/map-coletor';
import { DoacoesPage } from '../doacoes/doacoes';


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
  rootPage = "";


  showTabDoador: boolean = false;
  showTabColetor: boolean = false;


  constructor(public navCtrl: NavController,
    private apiProvider: ApiDataProvider,
    public storage: StorageProvider,
    public alertProvider: AlertProvider
  ) {
    this.tabDoador = MapDoadorPage;
    this.tabColetor = MapColetorPage;
    this.tabLogin = LoginPage;

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
              if (data) {
                this.navCtrl.setRoot(LoginPage);
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
