'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('../axios/http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endereco = {
  Endereco: function Endereco() {
    var Endereco = {
      // logradouros 
      logradouro: '',
      numero: 0,
      complemento: '',
      cep: '',
      latitude: 0,
      longitude: 0,
      observacao: '',
      // bairros
      bairro: '',
      // cidades
      cidade: '',
      // estados
      uf: '',
      // paises
      pais: ''
    };
    return Endereco;
  },
  setEndereco: function setEndereco(data) {
    var aux = this.Endereco();
    if (data === null) return aux;
    aux.logradouro = data.endereco;
    aux.numero = data.enderecoNumero;
    aux.complemento = data.complemento;
    aux.cep = data.cep;
    aux.latitude = data.latitude;
    aux.longitude = data.longitude;
    aux.observacao = data.observacao;
    aux.bairro = data.bairro;
    aux.cidade = data.cidade;
    aux.uf = data.uf;
    aux.pais = data.pais;
    return aux;
  },
  setDefaults: function setDefaults(dados) {
    if (dados.logradouro === undefined || dados.logradouro === null) dados.logradouro = '';

    if (dados.numero === undefined || dados.numero === null) dados.numero = 0;

    if (dados.complemento === undefined || dados.complemento === null) dados.complemento = '';

    if (dados.cep === undefined || dados.cep === null) dados.cep = '';

    if (dados.latitude === undefined || dados.latitude === null) dados.latitude = 0;

    if (dados.longitude === undefined || dados.longitude === null) dados.longitude = 0;

    if (dados.observacao === undefined || dados.observacao === null) dados.observacao = '';

    if (dados.bairro === undefined || dados.bairro === null) dados.bairro = '';

    if (dados.cidade === undefined || dados.cidade === null) dados.cidade = '';

    if (dados.uf === undefined || dados.uf === null) dados.uf = '';

    if (dados.pais === undefined || dados.pais === null) dados.pais = '';
  },
  validar: function validar(dados) {
    var isAlteracao = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (dados.logradouro && dados.logradouro.toString().trim() === '') {
      throw Error('LOGRADOURO não foi preenchido');
    }

    if (dados.numero && dados.numero.toString().trim() === '') {
      throw Error('NUMERO não foi preenchido');
    }

    if (dados.cep && dados.cep.toString().trim() === '') {
      throw Error('CEP não foi preenchido');
    }

    if (dados.bairro && dados.bairro.toString().trim() === '') {
      throw Error('BAIRRO não foi preenchido');
    }

    if (dados.cidade && dados.cidade.toString().trim() === '') {
      throw Error('CIDADE não foi preenchido');
    }

    if (dados.uf && dados.uf.toString().trim() === '') {
      throw Error('UF não foi preenchido');
    }
  },
  compor: function compor(endereco) {
    var result = '';
    if (endereco.logradouro && endereco.logradouro != '') result = '' + result + endereco.logradouro;

    if (endereco.numero && endereco.numero != -1) result = result + ', ' + endereco.numero;

    if (endereco.complemento && endereco.complemento != '') result = result + ' ' + endereco.complemento;

    if (endereco.cidade && endereco.cidade != '') result = result + ' ' + endereco.cidade;

    if (endereco.uf && endereco.uf != '') result = result + ' - ' + endereco.uf;

    if (endereco.cep && endereco.cep != '') result = result + ' CEP: ' + endereco.cep;

    return result;
  }
};

exports.default = endereco;