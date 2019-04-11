import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiDataProvider Provider');
  }

  private host: string = "http://192.168.0.101";
  private port: string = ":45455/";




  getPessoaTipo(tipo) {
    let dir: string = "api/pessoa/tipo/";

    return new Promise((resolve, reject) => {
      this.http.get(this.host + this.port + dir + tipo)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }



  getPessoaTipoEstado(tipo, estado) {
    let dir: string = "api/pessoa/tipo/";

    return new Promise((resolve, reject) => {
      this.http.get(this.host + this.port + dir + tipo + "/uf=" + estado)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }
  postPessoa(dados: any) {
    let dir: string = "api/pessoa/";
    return new Promise((resolve, reject) => {
      this.http.post(this.host + this.port + dir, dados)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }


  postPessoaLogin(dados: any) {
    let dir: string = "api/pessoa/login";
    return new Promise((resolve, reject) => {
      this.http.post(this.host + this.port + dir, dados)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }


  getEstados() {
    let dir: string = "api/estado";
    return new Promise((resolve, reject) => {
      this.http.get(this.host + this.port + dir)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }

  getMunicipios(uf) {
    let dir: string = "api/municipio/uf/";
    return new Promise((resolve, reject) => {
      this.http.get(this.host + this.port + dir + uf)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }



 // Buscar produtos por pessoa = PessoaId
 getDoacoes(id) {
  let dir: string = "api/doacao/pessoa/";
  return new Promise((resolve, reject) => {
    this.http.get(this.host + this.port + dir + id)
      .subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);

        });
  });
}



// Buscar produtos por pessoa = PessoaId
getDoacoesUsuario(idDoador, idColetor) {
  let dir: string = "api/doacao/pessoa/";
  return new Promise((resolve, reject) => {
    this.http.get(this.host + this.port + dir + "/d="+idDoador+"/r="+idColetor)
      .subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);

        });
  });
}



  // Buscar produtos por pessoa = PessoaId
  getProdutos(id) {
    let dir: string = "api/produto/pessoa/";
    return new Promise((resolve, reject) => {
      this.http.get(this.host + this.port + dir + id)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);

          });
    });
  }

  // Enviar doação com  produtos por pessoa
  setProdutosDoacao(itens) {
    let dir: string = "api/Doacao";
    return new Promise((resolve, reject) => {
      this.http.post(this.host + this.port + dir , itens)
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
