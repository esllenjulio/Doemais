import { ApiEnderecoProvider } from './../../providers/api-endereco/api-endereco';
import { ApiDataProvider } from './../../providers/api-data/api-data';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import leaflet from 'leaflet';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { Geolocation } from '@ionic-native/geolocation/ngx';

/**
 * Generated class for the CadastrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage {

  cep: any = "";
  @ViewChild('map2') mapContainer: ElementRef;
  @ViewChild('slides') slides: Slides;
  map2: any;
  tipoPessoa: any;
  DesctipoPessoa: any = "";

  searchQuery: string = '';
  itens: any[];

  Estados: any[];
  Municipios: any[];
  EstadoSelecionado: any;
  MunicipioSelecionado: any;
  UfEstado: any;
  NomeMunicipio: any;

  pessoa: any = {
    "Nome": "Esllen julio marques",
    "Cpf": "09608103401",
    "Email": "Esllenjulio@hotmail.com",
    "Telefone": "32311150",
    "tipoPessoaId": 1
  }

  userForm: FormGroup;
  PessoaForm: FormGroup;

  isNome: boolean = false;
  isEmail: boolean = false;
  isTelefone: boolean = false;
  isSenha: boolean = false;
  isCpf: boolean = false;
 

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private apiData: ApiDataProvider,
    private apiCep: ApiEnderecoProvider,
    public fb: FormBuilder
    ) {
      // this.userForm = new FormGroup({
      //   Nome: new FormControl('', [Validators.required]),
      //   Cpf: new FormControl('', [Validators.required]),
      //   Email: new FormControl('', [Validators.required]),
      //   Telefone: new FormControl('', [Validators.required]),
      //   tipoPessoa: new FormControl('', null)
        
      // });

      // this.userForm.setValue(
      //   {
      //     "Nome":"jose",
      //     "Cpf":"09608103401",
      //     "Email":"julio@hotmai.com",
      //     "Telefone":"886564444",
      //      "tipoPessoa":''
      //   }
      //   );
      this.PessoaForm = this.fb.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['',[Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
        telefone: ['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        tipoPessoa:['']
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarPage');
    this.Estados = [];
    this.loadmap();



   

    // public
    // this.items = [
    //   'Amsterdam',
    //   'Bogota',
    //   'Brazil'
    // ];

    this.apiData.getEstados().then(
      (data: any) => {
        console.log(data);
        this.Estados = data;
      }
    )
      .catch(
        error => { console.log(error) }
      )

  }



  validate(data){
    if(data == 'Nome'){
      this.isNome = true;
    }
    else if(data == 'email'){
      this.isEmail = true;
    }
    else if(data == 'telefone'){
      this.isTelefone = true;
    }
    else if(data == 'senha'){
      this.isSenha = true;
    }
    else if(data == 'cpf'){
      this.isCpf = true;
    }
  }


  private selecionarTipoPessoa(tipo) {
    console.log(tipo)
    if (tipo == 1) {
      this.tipoPessoa = 1;
      this.DesctipoPessoa = "Doador";
    } else {
      this.tipoPessoa = 2;
      this.DesctipoPessoa = "Coletor";

    }
  }
  
  private cadastrarPessoa(){
    console.log(this.PessoaForm);
    // this.userForm.setValue({"tipoPessoa":"this.tipoPessoa"});
    // this.apiData.postPessoa(this.userForm.value)
    //   .then(
    //     (data) => {
    //       console.log(data)
    //     }
    //   )
    //   .catch(
    //     error => { console.log(error) }
    //   )

  }


  getItems(ev: any) {
    // Reset items back to all of the items
    // this.items = [
    //   'Amsterdam',
    //   'Bogota',
    //   'Brazil'
    // ];
    this.itens = []
    if (ev.target.value.length >= 3) {

      this.apiCep.getLogradouros(this.UfEstado, this.NomeMunicipio, ev.target.value)
        .then(
          (data: any) => {
            this.itens = data;
            // console.log(data);
            this.itens = this.itens.filter((item) => {
              console.log(item)
              return (item.logradouro.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
          }
        )
        .catch(
          error => { console.log(error) }
        )
      // set val to the value of the searchbar
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      // if (val && val.trim() != '') {
      //   this.itens = this.itens.filter((item) => {
      //     console.log(item)
      //     return (item.logradouro.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //   })
      // }
    }
  }

  private selecionarEstado(item) {
    console.log(item)
    this.EstadoSelecionado = item.idEstado;
    this.UfEstado = item.uf;

    this.apiData.getMunicipios(item.uf).then(
      (data: any) => {
        console.log(data);
        this.Municipios = data;
      }
    )
      .catch(
        error => { console.log(error) }
      )

  }

  selecionarMunicipio(item) {
    this.MunicipioSelecionado = item.idMunicipio;
    this.NomeMunicipio = item.nome;
  }


  buscarLogradouros() {
    // this.apiCep.getLogradouros(this.UfEstado ,this.NomeMunicipio)
    //   .then(
    //     (data: any) => {
    //       console.log(data);
    //     }
    //   )
    //   .catch(
    //     error => { console.log(error) }
    //   )
  }

 

  private voltarSlider() {
    this.slides.slidePrev();
  }

  private proximoSlider() {
    this.slides.slideNext();
  }


  



  loadmap() {
    this.map2 = leaflet.map("map2").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map2);
    this.map2.locate({
      setView: true,
      maxZoom: 20
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map2.addLayer(markerGroup);
    }).on('locationerror', (err) => {
      alert(err.message);
    })
  }


  public buscarDadosCep(cep) {
    console.log(cep.value);
    this.apiCep.getDadosCep(cep.value).then(
      (data: any) => {
        console.log(data)
        this.buscarCoordenadas(data.logradouro)

      }
    )
      .catch(
        error => { console.log(error) }
      )
  }



  buscarCoordenadas(logradouro) {
    this.apiCep.getCoordenadas(logradouro).then(
      (data) => {
        console.log(data)


      }
    )
      .catch(
        error => { console.log(error) }
      )
  }


}
