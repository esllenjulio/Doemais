import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItensDoacaoPage } from './itens-doacao';

@NgModule({
  declarations: [
    ItensDoacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ItensDoacaoPage),
  ],
})
export class ItensDoacaoPageModule {}
