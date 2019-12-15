'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('../axios/http');

var _http2 = _interopRequireDefault(_http);

var _funcoes = require('./funcoes');

var _funcoes2 = _interopRequireDefault(_funcoes);

var _acessoService = require('./acessoService');

var _acessoService2 = _interopRequireDefault(_acessoService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var workflow = {
  Workflow: function Workflow() {
    var Workflow = {
      'id': 0,
      'guid': '',
      'descricao': '',
      'dataCriacao': new Date(),
      'dataAtualizacao': new Date(),
      'passos': [],
      'empresaPertencente': {},
      'usuario': _acessoService2.default.Usuario()
    };
    return Workflow;
  },
  setWorkflow: function setWorkflow(data) {
    var aux = this.Workflow();

    aux.id = data.id;
    aux.guid = data.guid;
    aux.descricao = data.descricao;
    aux.passos = data.passos;
    aux.empresaPertencente = data.empresaPertencente;

    if (data.dataCriacao !== undefined && data.dataCriacao !== null && data.dataCriacao !== '') aux.dataCriacao = data.dataCriacao;

    if (data.dataAtualizacao !== undefined && data.dataAtualizacao !== null && data.dataAtualizacao !== '') aux.dataAtualizacao = data.dataAtualizacao;

    if (!_funcoes2.default.isEmptyObject(data.usuario)) {
      aux.usuario = _acessoService2.default.setUsuario(data.usuario);
    }

    return aux;
  },
  listar: function listar(dados) {
    var _this = this;

    try {
      var url = '/api/workflows/';
      var api_params = {};
      var resultArray = [];

      if (_funcoes2.default.propsQuantity(dados) === 1) {
        //TEMPLATE_PARAMS
        api_params = dados[_funcoes2.default.getPropByIndex(dados, 0).toString()];
        url = url + api_params;
      } else {
        //QUERY_PARAMS
        if (typeof dados.guid === 'string' && dados.guid.toString() !== '') api_params = { guid: dados.guid };
      }

      return _http2.default.get(url, api_params).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        if (response.data.data == undefined || response.data.data == null) throw Error('Retorno da API inválido');

        if (Array.isArray(response.data.data)) resultArray = response.data.data;else resultArray.push(response.data.data);

        var listWorkflows = resultArray.map(function (values) {
          var workf = _this.setWorkflow(values);
          return workf;
        });

        return Promise.resolve(listWorkflows);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  listarPassos: function listarPassos(guid) {
    var _this2 = this;

    try {
      var url = '/api/workflows/' + guid + '/passos';
      var api_params = {};
      var resultArray = [];

      return _http2.default.get(url, api_params).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        if (response.data.data == undefined || response.data.data == null) throw Error('Retorno da API inválido');

        if (Array.isArray(response.data.data)) resultArray = response.data.data;else resultArray.push(response.data.data);

        var listWorkflows = resultArray.map(function (values) {
          var workf = _this2.setWorkflow(values);
          return workf;
        });

        return Promise.resolve(listWorkflows);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

exports.default = workflow;