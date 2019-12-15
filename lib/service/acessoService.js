'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('../axios/http');

var _http2 = _interopRequireDefault(_http);

var _funcoes = require('./funcoes');

var _funcoes2 = _interopRequireDefault(_funcoes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var acesso = {
  // Classe usuario
  Usuario: function Usuario() {
    var Usuario = {
      id: -1,
      guid: '',
      login: '',
      senha: '',
      administrador: false,
      empresaPertencente: {},
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      token: ''
    };
    return Usuario;
  },
  setUsuario: function setUsuario(data) {
    var aux = this.Usuario();
    //usr.nome = nome;
    aux.id = data.id;
    aux.guid = data.guid;
    aux.login = data.login;
    aux.senha = data.senha;
    aux.administrador = data.administrador;
    aux.empresaPertencente = data.empresaPertencente;
    if (data.dataCriacao !== undefined && data.dataCriacao !== null && data.dataCriacao !== '') aux.dataCriacao = data.dataCriacao;

    if (data.dataAtualizacao !== undefined && data.dataAtualizacao !== null && data.dataAtualizacao !== '') aux.dataAtualizacao = data.dataAtualizacao;

    //if (data.token)
    //  usr.token = data.token;
    return aux;
  },
  login: function login(email, senha) {
    var _this = this;

    try {
      if (email !== 'push') _funcoes2.default.validaEmail(email);
      _funcoes2.default.validaSenha(senha, false);

      return _http2.default.post('/api/Usuarios/acesso/', { login: email, senha: senha }).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.mensagens);
        }

        if (response.data.data == null) throw Error(response.data.mensagens);

        var usr = _this.setUsuario(response.data.data);
        return Promise.resolve(usr);
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.hasProp(rejected.response.data, 'mensagens')) {
            throw Error(rejected.response.data['mensagens']);
          } else if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else throw Error(rejected.message.toString());
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  esqueceuSenha: function esqueceuSenha(email) {
    try {
      _funcoes2.default.validaEmail(email);

      return _http2.default.post('http://www.mocky.io/v2/5c5791422f00007509856a50', { email: email }).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        return Promise.resolve(response.data);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  alterarSenha: function alterarSenha(token, senha, confirmacao) {
    try {
      if (token == '') throw Error('Não existe um token de validação ou ele expirou');

      if (senha != confirmacao) throw Error('As senhas devem ser iguais');

      return _http2.default.post('http://www.mocky.io/v2/5c48ea6b32000055000b5659', { token: token, senha: senha, confirmacao: confirmacao }).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        return Promise.resolve(response.data);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  validar: function validar(usuario) {
    var isAlteracao = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  },
  incluir: function incluir(usuario) {},
  alterar: function alterar() {}
};

exports.default = acesso;