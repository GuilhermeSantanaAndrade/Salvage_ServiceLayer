'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('../axios/http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contato = {
  Contato: function Contato() {
    var Contato = {
      guid: '',
      nome: '',
      celular: '',
      email: '',
      dataCriacao: new Date(),
      dataAtualizacao: new Date()
    };
    return Contato;
  },
  setDefaults: function setDefaults(dados) {},
  validar: function validar(dados) {
    var isAlteracao = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isAlteracao && dados.guid && dados.guid.toString().trim() === '') {
      throw Error('GUID não foi preenchido');
    }

    if (dados.nome && dados.nome.toString().trim() === '') {
      throw Error('NOME não foi preenchido');
    }
  }
};

exports.default = contato;