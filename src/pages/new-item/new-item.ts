import { ItensDoacaoPage } from './../itens-doacao/itens-doacao';
import { AlertProvider } from './../../providers/alert/alert';
import { StorageProvider } from './../../providers/storage/storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { ApiDataProvider } from '../../providers/api-data/api-data';
/**
 * Generated class for the NewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {

  public progress: number;
  public message: string;
  public user: any;
  public imgs: any = [];
  public imgsInLocal: any = [];
  public imgsInServer: any = [];
  public addItem: boolean = false;


  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private http: HttpClient,
    private events: Events,
    private apiData: ApiDataProvider,
    private storage: StorageProvider) {

    this.storage.getUserStorage()
      .then(
        (data: any) => {
          if (data == null) {
            this.alert.showConfirmLogin();
          } else {
            this.user = data;
            console.log(this.user)
          }
        });
        this.imgsInLocal = [];
  }


  produto: any = {
    nome: "Camisa",
    marca: "Sem descição",
    pessoaId: null,
    DoacaoId: null
  }


  AddNewItem(files) {
    console.log(files)
    this.produto.pessoaId = this.user.pessoaId;

    if (files.length === 0)
      return;

    const formData = new FormData();

    let img = { descricao: "", IdProduto: 0, ProdutoId: 0 }

    let detailsImg = JSON.stringify(img);
    formData.append('imagem', detailsImg);

    let detailsProduto = JSON.stringify(this.produto);
    formData.append('produto', detailsProduto);

    for (let file of this.imgsInLocal) {
      this.imgs = [];
      this.imgs.push(file)
      formData.append(file.name, file);
      console.log(file)
      console.log(formData)
      console.log("eu")
    }

    
    // for (let file of files) {
    //   this.imgs = [];
    //   this.imgs.push(file)
    //   formData.append(file.name, file);
    //   console.log(formData)
    // }
    const uploadReq = new HttpRequest('POST', this.apiData.host + this.apiData.port + `/api/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log(event)
        this.progress = Math.round(100 * event.loaded / event.total);
        this.imgsInServer = this.imgs;
        console.log(this.imgsInServer)
        this.addItem = true;
      } else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }

  onUploadChange(evt: any) {
    // const file = evt.target.files[0];
    // console.log(file.name)
    // this.imgs.push(file.name)
    // // this.imgsInServer.
    
    for(let i=0;i<evt.target.files.length;i++){
      this.imgsInLocal.push(evt.target.files[i])
      console.log(evt.target.files[i])
    }
    // for(let i in evt.target.files){
    //   console.log(i)
    //   let img = evt.target.files[i];
    //   this.imgsInServer.push(img.name)
    // }

    console.log(this.imgsInServer)
    // imgsInLocal
    
  }


  upload(files) {

    // this.pessoa = { descricao: "jose", IdProduto: 1, ProdutoId: null }

    // if (files.length === 0)
    //   return;

    // const formData = new FormData();
    // var details = JSON.stringify(this.pessoa);
    // formData.append('imagem', details);

    // for (let file of files)
    //   formData.append(file.name, file);

    // const uploadReq = new HttpRequest('POST', ` http://192.168.0.101:45455/api/upload`, formData, {
    //   reportProgress: true,
    // });

    // this.http.request(uploadReq).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress)
    //     this.progress = Math.round(100 * event.loaded / event.total);
    //   else if (event.type === HttpEventType.Response)
    //     this.message = event.body.toString();
    // });
  }



  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop().then(() => {
        this.events.publish('custom-user-events', this.addItem);
      });
    };

  }





}
