import { ApiDataProvider } from './../../providers/api-data/api-data';
import { AlertProvider } from './../../providers/alert/alert';
import { StorageProvider } from './../../providers/storage/storage';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, ModalController } from 'ionic-angular';
import { ItensDoacaoPage } from '../itens-doacao/itens-doacao';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  dados: any = null;
  dadosUsuario: any = null;
  listaDoacoes: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    public modalCtrl: ModalController,
    public storage: StorageProvider,
    private alert: AlertProvider,
    private apiData: ApiDataProvider) {
    this.dados = this.navParams.get('dados');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    console.log(this.listaDoacoes)

    this.storage.getUserStorage()
      .then(
        (data: any) => {
          console.log(data);

          if (data == null) {
            this.alert.showConfirmLogin();
          } else {
            this.dadosUsuario = [];
            this.dadosUsuario = data;
            console.log(this.dadosUsuario)
            this.getDoacoesUsuario();
          }
        });

  }


  closeModal() {
    this.view.dismiss();
  }


  abrirMapaExterno(dados) {
    // javascript:window.open('geo:-7.0995734, -34.8410316', '_system') 
  }

  selecionarItensDoacao(dados) {
    // this.view.dismiss(); 
    const modal = this.modalCtrl.create(ItensDoacaoPage, { dadosColetor: dados });
    modal.present();
  }

  getDoacoesUsuario() {
    this.dadosUsuario
    this.dados
    console.log(this.dadosUsuario)
    console.log(this.dadosUsuario.pessoaId)
    this.apiData.getDoacoesUsuario(this.dadosUsuario.pessoaId, this.dados.pessoaId).then(

      (data) => {
        console.log(data)
        this.listaDoacoes = [];
        this.listaDoacoes = data;
      },
      (error) => {
        console.log(error)
      }
    );


  }
}
