import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }


  getUserStorage() {

    return new Promise((resolve, reject) => {

      this.storage.get('usuario')
        .then(
          (val) => {
            console.log(val);
            resolve(val)
          })
        .catch(
          error => {
            console.log(error);
            reject(error)
          }
        );

    });

  }



  setUserStorage(user) {
    // this.storage.set('usuario', user);
    return new Promise((resolve, reject) => {

      this.storage.set('usuario', user)
        .then(
          (val) => {
            console.log(val);
            resolve(val)
          })
        .catch(
          error => {
            console.log(error);
            reject(error)
          }
        );

    });
  }




}
