import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';
import { ApiDataProvider } from '../providers/api-data/api-data';
import { ApiEnderecoProvider } from '../providers/api-endereco/api-endereco';
import { AlertProvider } from '../providers/alert/alert';
import { StorageProvider } from '../providers/storage/storage';
import { MapDoadorPage } from '../pages/map-doador/map-doador';
import { MapColetorPage } from '../pages/map-coletor/map-coletor';
import { ModalPage } from '../pages/modal/modal';
import { DoacoesPage } from '../pages/doacoes/doacoes';
import { ItensDoacaoPage } from '../pages/itens-doacao/itens-doacao';
import { NewItemPage } from '../pages/new-item/new-item';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CadastrarPage,
    LoginPage,
    MapColetorPage,
    MapDoadorPage,
    ModalPage,
    DoacoesPage,
    ItensDoacaoPage,
    NewItemPage
     
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
   
    IonicModule.forRoot(MyApp, {
			scrollAssist: false
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CadastrarPage,
    LoginPage,
    MapColetorPage,
    MapDoadorPage,
    ModalPage,
    DoacoesPage,
    ItensDoacaoPage,
    NewItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    ApiDataProvider,
    ApiEnderecoProvider,
    AlertProvider,
    StorageProvider,

  ]
})
export class AppModule {}
