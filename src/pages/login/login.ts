import { StorageProvider } from './../../providers/storage/storage';
import { HomePage } from './../home/home';
import { ApiDataProvider } from './../../providers/api-data/api-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isAndroid: boolean = false;
  login: string = "entrar";
  tipoPessoaId: any;
  PessoaLogin: FormGroup;
  PessoaFisica: FormGroup;
  PessoaJuridica: FormGroup;

  constructor(public navCtrl: NavController,
    public fb: FormBuilder,
    public apiData: ApiDataProvider,
    public alert: AlertProvider,
    public navParams: NavParams,
    public platform: Platform,
    public storage: StorageProvider
  ) {
    this.isAndroid = platform.is('android');

    this.PessoaLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.PessoaFisica = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
      telefone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      repeatSenha: ['', [Validators.required, Validators.minLength(6)]],
      tipoPessoaId: ['']
    });

    this.PessoaJuridica = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
      telefone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      repeatSenha: ['', [Validators.required, Validators.minLength(6)]],
      tipoPessoaId: ['']
    });

    this.PessoaLogin.get('email').setValue("esllenjulio@gmail.com");
    this.PessoaLogin.get('senha').setValue("Esllen12");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }



  private Entrar() {
    // console.log(this.PessoaLogin.value)
    this.apiData.postPessoaLogin(this.PessoaLogin.value)
      .then(
        (data: any) => {
          this.storage.setUserStorage(data).then(
            (data: any) => {
              console.log(data);
              this.alert.presentToast("Bem vindo " + data.nome)
              this.navCtrl.setRoot(HomePage);
            });
        }
      )
      .catch(
        err => {
          console.log(err.status);
          if (err.status == 401) {
            this.alert.presentToast("Login ou senha inválidos")
          } else {
            if (err!.error!.Senha) {
              this.alert.presentToast(err.error.Senha)
            }
            if (err!.error!.Email) {
              this.alert.presentToast(err.error.Email)
            }
          }
        }
      )

  }

  private selecionarTipoPessoa(tipo) {
    console.log(tipo)
    if (tipo == 1) {
      this.tipoPessoaId = 1;
    } else if (tipo == 2) {
      this.tipoPessoaId = 2;
    }

    this.PessoaFisica.get('nome').setValue("jose santos fisica");
    this.PessoaFisica.get('email').setValue("j@j");
    this.PessoaFisica.get('cpf').setValue("09608103401");
    this.PessoaFisica.get('telefone').setValue('8332322222');
    this.PessoaFisica.get('senha').setValue('12345678');
    this.PessoaFisica.get('repeatSenha').setValue("1213123123");
    this.PessoaFisica.get('tipoPessoaId').setValue(this.tipoPessoaId);

    this.PessoaJuridica.get('nome').setValue("jose santos juridica");
    this.PessoaJuridica.get('email').setValue("j@j");
    this.PessoaJuridica.get('cnpj').setValue("096081034012");
    this.PessoaJuridica.get('telefone').setValue('8332322222');
    this.PessoaJuridica.get('senha').setValue('12345678');
    this.PessoaJuridica.get('repeatSenha').setValue("1213123123");
    this.PessoaJuridica.get('tipoPessoaId').setValue(this.tipoPessoaId);

  }


  private cadastrarPessoa(tipo) {

    if (tipo == "fisica") {
      this.PessoaFisica.get('tipoPessoaId').setValue(this.tipoPessoaId);
      // this.PessoaFisica.setValue({"tipoPessoaId":this.tipoPessoaId});
      console.log(this.PessoaFisica);

      this.apiData.postPessoa(this.PessoaFisica.value)
        .then(
          (data) => {
            console.log(data)
          }
        )
        .catch(
          error => { console.log(error) }
        )
    } else if (tipo == "juridica") {
      this.PessoaJuridica.get('tipoPessoaId').setValue(this.tipoPessoaId);

      this.apiData.postPessoa(this.PessoaJuridica.value)
        .then(
          (data) => {
            console.log(data)
          }
        )
        .catch(
          error => { console.log(error) }
        )
      console.log(this.PessoaJuridica);
    }

  }

}
