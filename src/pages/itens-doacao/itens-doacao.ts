import { ApiDataProvider } from './../../providers/api-data/api-data';
import { AlertProvider } from './../../providers/alert/alert';
import { StorageProvider } from './../../providers/storage/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, DateTime, Events } from 'ionic-angular';
import { NewItemPage } from '../new-item/new-item';

/**
 * Generated class for the ItensDoacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itens-doacao',
  templateUrl: 'itens-doacao.html',
})
export class ItensDoacaoPage {

  dados: any = [];
  itens: any = [];
  user: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events,
    public viewCtrl: ViewController, private storage: StorageProvider, private alert: AlertProvider, private apiData: ApiDataProvider) {
    this.dados = this.navParams.get('dadosColetor');
    console.log(this.dados)
  }

  ionViewDidLoad() {
    this.storage.getUserStorage()
      .then(
        (data: any) => {
          console.log(data);

          if (data == null) {
            this.alert.showConfirmLogin();
          } else {
            this.user = data;
            this.buscarProdutos(data);
          }
        });
  }

  dismiss() {
    this.navCtrl.popToRoot()
  }


  buscarProdutos(dados) {
    this.itens = [];
    this.apiData.getProdutos(dados.pessoaId).then(
      (data) => {
        console.log(data);
        this.itens = data;
      },
      (error) => {
        console.log(error)
      }
    )

  }


  criarDoacao() {


    let doacao = {
      status: "Aguardando",
      idReceptor: this.dados.pessoaId,
      data: new Date(),
      IdDoador: this.user.pessoaId,
      Produto: this.itens
    }
    console.log(doacao)

    if (this.itens.length != 0) {
      this.apiData.setProdutosDoacao(doacao).then(
        (data: any) => {
          console.log(data);
          alert(data);
          this.buscarProdutos(this.user);
        },
        (error) => {
          console.log(error)
        }
      );
    } else {
      alert("Selecione Pelo menos um produto");
    }


  }


  AddItem() {
    this.events.subscribe('custom-user-events', (paramsVar) => {
      // this.itens.push(paramsVar);:
      console.log(paramsVar)
      if(paramsVar==true){
        this.buscarProdutos(this.user);
      }
      this.events.unsubscribe('custom-user-events'); 
    })
    this.navCtrl.push(NewItemPage); 
  }




}
