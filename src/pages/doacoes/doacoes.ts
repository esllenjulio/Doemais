import { ApiDataProvider } from './../../providers/api-data/api-data';
import { StorageProvider } from './../../providers/storage/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DoacaoProvider } from '../../providers/doacao/doacao';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: StorageProvider, 
    private doacaoProvider: DoacaoProvider, 
    private ApiData: ApiDataProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoacoesPage');
    this.doacaoProvider.getDoacoes();
  }






}
