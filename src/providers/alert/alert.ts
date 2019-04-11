import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';


/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  public loader: any;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController) { }

  presentToast(msg: any) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top'
    });
    toast.present();

  }


  showConfirmLogin() {
    let logar: boolean = false;

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
            return false

          }
        }
      ]
    });
    confirm.present();
    return confirm;
  }


  presentActionSheet() {

  }


  showLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg,
      duration: 100000
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }


  showAlert(title = "Falha ao buscar sua Localização...", subtitle = "Verifique se seu aparelho possui GPS, caso possua clique em ATIVAR!") {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
