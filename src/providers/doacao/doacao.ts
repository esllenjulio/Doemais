import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';
import { ApiDataProvider } from '../api-data/api-data';

/*
  Generated class for the DoacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DoacaoProvider {
  dadosUsuario:any = [];
  listDoacoes:any = [];

  constructor(public http: HttpClient, private storage: StorageProvider, private ApiData: ApiDataProvider) {
    console.log('Hello DoacaoProvider Provider');
  }




  getDoacoes() {


    this.storage.getUserStorage()
    .then(
      (data:any) => {
         console.log(data);

        if (data == null) {

        } else {
          this.dadosUsuario = data;
          console.log(data)
          this.getDoacoesServer(this.dadosUsuario);
        }
      });


 
  }



  getDoacoesServer(dados){
    this.listDoacoes = [];
    this.ApiData.getDoacoes( dados.tipoPessoaId, dados.pessoaId).then(

      (data) => {
        console.log(data)
        this.listDoacoes = data;
      },
      (error) => {
        console.log(error)
      }

    )
    .catch(
      err=>{

        console.log(err)
      }
    );
  }
}
