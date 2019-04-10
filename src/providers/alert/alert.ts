import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, NavController, ActionSheetController  } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';


/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

 

  constructor( public toastCtrl: ToastController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {  }

  presentToast(msg:any) {
   const toast = this.toastCtrl.create({
        message: msg,
        duration: 5000,
        position:'top'
      });
      toast.present();
    
  }


  showConfirmLogin() {
    let logar:boolean = false;

    const confirm = this.alertCtrl.create({
      title: 'Entrar no sistema',
      message: 'Verificamos que você não está logado com sua conta de usuario! Deseja Entrar no sistema? ',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não entrar');
            confirm.dismiss(false);
            return false
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Entrar no sistema');
            confirm.dismiss(true);
            return  false
           
          }
        }
      ]
    });
    confirm.present();
    return confirm;
  }


  presentActionSheet() {
    
  }

}
