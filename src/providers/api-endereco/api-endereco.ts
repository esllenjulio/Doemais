import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiEnderecoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiEnderecoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiEnderecoProvider Provider');
  }




  getDadosCep(cep) {

    return new Promise((resolve, reject) => {
      this.http.get("https://viacep.com.br/ws/" + cep + "/json/")
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }


  getLogradouros(uf, municipio, logradouro) {

    return new Promise((resolve, reject) => {
      this.http.get("https://viacep.com.br/ws/" + uf + "/" + municipio + "/" + logradouro + "/json/")
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }

  getCoordenadas(endereco: any) {
    return new Promise((resolve, reject) => {
      this.http.get("https://nominatim.openstreetmap.org/search?format=json&q=" + endereco)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }


  getEstadoCoordenadas(lat: any, lon:any) {
    return new Promise((resolve, reject) => {
      this.http.get("http://photon.komoot.de/reverse?&lat=" + lat + "&lon=" + lon)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }


}
