import { ApiDataProvider } from './../../providers/api-data/api-data';
import { StorageProvider } from './../../providers/storage/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DoacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doacoes',
  templateUrl: 'doacoes.html',
})
export class DoacoesPage {

  listDoacoes: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageProvider, private ApiData: ApiDataProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoacoesPage');
    this.getProdutos();
  }




  getProdutos() {

    this.storage.getUserStorage()
      .then(
        (data: any) => {
          console.log(data);

          if (data == null) {

          } else {
            this.getDoacoes(data.pessoaId);
          }
        });
  }


  getDoacoes(idPessoa) {
    this.listDoacoes = [];
    this.ApiData.getDoacoes(idPessoa).then(

      (data) => {
        console.log(data)
        this.listDoacoes = data;
      },
      (error) => {
        console.log(error)
      }

    )
  }

}
