'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('../axios/http');

var _http2 = _interopRequireDefault(_http);

var _workflowService = require('./workflowService');

var _workflowService2 = _interopRequireDefault(_workflowService);

var _funcoes = require('./funcoes');

var _funcoes2 = _interopRequireDefault(_funcoes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var etapaWorkflow = {
  EtapaWorkflow: function EtapaWorkflow() {
    var EtapaWorkflow = {
      id: -1,
      descricao: '',
      descricaoParaFazer: '',
      ordem: -1,
      enviaEmail: false,
      enviaSMS: false,
      linkPushEmail: false,
      tipoEmpresaResponsavel: -1,
      strTpEmpresa: '',
      workflow: _workflowService2.default.Workflow()
    };
    return EtapaWorkflow;
  },
  tpEmpresaToString: function tpEmpresaToString(tpEmpresa) {
    if (tpEmpresa === 0) {
      return 'Seguradora';
    } else if (tpEmpresa === 1) {
      return 'Guincheiro';
    } else if (tpEmpresa === 2) {
      return 'Despachante';
    } else if (tpEmpresa === 3) {
      return 'Patio';
    } else if (tpEmpresa === 4) {
      return 'Oficina';
    }
    return '';
  },
  strEmpresaToInt: function strEmpresaToInt(tpEmpresa) {
    if (tpEmpresa === 'Seguradora') {
      return 0;
    } else if (tpEmpresa === 'Guincheiro') {
      return 1;
    } else if (tpEmpresa === 'Despachante') {
      return 2;
    } else if (tpEmpresa === 'Patio') {
      return 3;
    } else if (tpEmpresa === 'Oficina') {
      return 4;
    }
    return '';
  },
  setEtapaWorkflow: function setEtapaWorkflow(data) {
    var aux = this.EtapaWorkflow();

    aux.id = data.id;
    aux.descricao = data.descricao;
    aux.descricaoParaFazer = data.descricaoParaFazer;
    aux.ordem = data.ordem;
    aux.enviaEmail = data.enviaEmail;
    aux.enviaSMS = data.enviaSMS;
    aux.linkPushEmail = data.linkPushEmail;
    aux.tipoEmpresaResponsavel = data.tipoEmpresaResponsavel;
    aux.strTpEmpresa = this.tpEmpresaToString(data.tipoEmpresaResponsavel);
    aux.workflow = _workflowService2.default.setWorkflow(data.workflow);

    return aux;
  },
  getEtapaWorkflow: function getEtapaWorkflow() {
    return _workflowService2.default.listar({}).then(function (wf) {
      if (!wf || wf === {}) return Promise.reject('Não há workflow ativo cadastrado.');
      wf = wf[0];

      // filtra todas as etapas cadastradas na base de dados
      return etapaWorkflow.listar({}).then(function (etapas) {
        // filtra e ordena apenas etapas deste workflow
        if (!etapas || etapas.length === 0) return Promise.reject('Não há etapa inicial cadastrada.');

        return etapas.filter(function (etp) {
          return etp.workflow.id === wf.id;
        }).sort(function (a, b) {
          return a.ordem - b.ordem;
        });
      });
    });
  },
  validar: function validar(dados) {
    var isAlteracao = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isAlteracao && dados.id && dados.id.toString().trim() === '') {
      throw Error('Id não foi preenchido');
    }

    if (dados.descricao.toString().trim() === '') {
      throw Error('DESCRIÇÃO não foi preenchido');
    }

    if (dados.ordem.toString().trim() === '') {
      throw Error('ORDEM não foi preenchido');
    }
  },
  incluir: function incluir(dados) {
    try {
      if (!_funcoes2.default.isEquivalentObjects(dados, this.EtapaWorkflow())) {
        return Promise.reject('Input inválido');
      }
      this.validar(dados);

      return _http2.default.post('/api/workflowPassos/', { "descricao": dados.descricao,
        "descricaoParaFazer": dados.descricaoParaFazer,
        "ordem": dados.ordem,
        "enviaEmail": dados.enviaEmail,
        "enviaSMS": dados.enviaSMS,
        "linkPushEmail": dados.linkPushEmail,
        "tipoEmpresaResponsavel": this.strEmpresaToInt(dados.strTpEmpresa),
        "workflow": dados.workflow
      }).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        return Promise.resolve(response.data);
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else throw Error(rejected.message.toString());
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  alterar: function alterar(dados) {
    try {
      if (!_funcoes2.default.isEquivalentObjects(dados, this.EtapaWorkflow())) {
        return Promise.reject('Input inválido');
      }

      this.validar(dados, true);

      return _http2.default.put('/api/workflowPassos/' + dados.id, { "id": dados.id,
        "descricao": dados.descricao,
        "descricaoParaFazer": dados.descricaoParaFazer,
        "ordem": dados.ordem,
        "enviaEmail": dados.enviaEmail,
        "enviaSMS": dados.enviaSMS,
        "linkPushEmail": dados.linkPushEmail,
        "tipoEmpresaResponsavel": this.strEmpresaToInt(dados.strTpEmpresa),
        "workflow": dados.workflow
      }).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        return Promise.resolve(response.data);
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else throw Error(rejected.message.toString());
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  deletar: function deletar(id) {
    try {
      return _http2.default.delete('/api/workflowPassos/' + id).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        return Promise.resolve(true);
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else throw Error(rejected.message.toString());
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  listar: function listar(dados) {
    var _this = this;

    try {
      var url = '/api/workflowPassos/';
      var api_params = {};
      var resultArray = [];

      if (_funcoes2.default.propsQuantity(dados) === 1) {
        //TEMPLATE_PARAMS
        api_params = dados[_funcoes2.default.getPropByIndex(dados, 0).toString()];
        url = url + api_params;
      } else {
        //QUERY_PARAMS
        if (typeof dados.id === 'number') api_params = { id: dados.id };
      }

      return _http2.default.get(url, api_params).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        if (response.data.data == undefined || response.data.data == null) throw Error('Retorno da API inválido');

        if (Array.isArray(response.data.data)) resultArray = response.data.data;else resultArray.push(response.data.data);

        var listEtapas = resultArray.map(function (values) {
          var etapa = _this.setEtapaWorkflow(values);
          return etapa;
        });

        return Promise.resolve(listEtapas);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

exports.default = etapaWorkflow;