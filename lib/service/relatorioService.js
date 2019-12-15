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

var _enderecoService = require('./enderecoService');

var _enderecoService2 = _interopRequireDefault(_enderecoService);

var _contatoService = require('./contatoService');

var _contatoService2 = _interopRequireDefault(_contatoService);

var _etapaWorkflowService = require('./etapaWorkflowService');

var _etapaWorkflowService2 = _interopRequireDefault(_etapaWorkflowService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var month = new Array();
month[0] = "Jan";
month[1] = "Fev";
month[2] = "Mar";
month[3] = "Abr";
month[4] = "Mai";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Ago";
month[8] = "Set";
month[9] = "Out";
month[10] = "Nov";
month[11] = "Dez";

var relatorio = {
  // Classe relatorio
  Relatorio: function Relatorio() {
    var Relatorio = {};
    return Relatorio;
  },
  anualFinalizados: function anualFinalizados(dados) {
    try {
      return _etapaWorkflowService2.default.getEtapaWorkflow({}).then(function (etapas) {
        if (etapas.length == 0) return Promise.resolve({ "meses": [], "valores": [] });
        var etapaFinal = etapas[etapas.length - 1].id;

        dados.guid = '34443981-8681-42f8-9276-f400c3f2282a';
        return _http2.default.get('/api/seguradoras/' + dados.guid + '/relatorios/salvados/passos/' + etapaFinal.toString() + '/dia/criacao', {}).then(function (response) {
          if (response.status != 200) {
            throw Error(response.data.message);
          }
          var dias = response.data.data;
          var result = [];
          var idx = -1;
          dias.map(function (dia) {
            idx = result.findIndex(function (element, i, arr) {
              return element.mes === dia.mesAno.substring(3, 5);
            });
            if (idx > -1) result[idx].quantidade = result[idx].quantidade + dia.quantidade;else result.push({ ano: dia.mesAno.substring(6, 10), mes: dia.mesAno.substring(3, 5), quantidade: dia.quantidade });
          });

          var meses = [];
          var meses_processed = [];
          var valores = [];
          var mes = '';

          result.map(function (result) {
            meses.push(result.mes + '/' + result.ano);
            valores.push(result.quantidade);
          });
          meses = meses.sort();
          valores = valores.sort();
          meses.map(function (result2) {
            var i = Number(result2.substring(0, 2));
            mes = month[i - 1];
            meses_processed.push(mes + '/' + result2.substring(5, 8));
          });

          return Promise.resolve({ "meses": meses_processed, "valores": valores });
        }, function (rejected) {
          if (rejected.response && rejected.response.data !== undefined) {
            if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
              throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
            }
          } else throw Error(rejected.message.toString());
        });
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  anualAbertos: function anualAbertos(dados) {
    try {
      dados.guid = '34443981-8681-42f8-9276-f400c3f2282a';
      return _http2.default.get('/api/seguradoras/' + dados.guid + '/relatorios/salvados/mes/criacao', {}).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }
        var dias = response.data.data;
        var result = [];
        var idx = -1;
        dias.map(function (dia) {
          idx = result.findIndex(function (element, i, arr) {
            return element.mes === dia.mesAno.substring(0, 2);
          });
          if (idx > -1) result[idx].quantidade = result[idx].quantidade + dia.quantidade;else result.push({ ano: dia.mesAno.substring(3, 7), mes: dia.mesAno.substring(0, 2), quantidade: dia.quantidade });
        });

        var meses = [];
        var meses_processed = [];
        var valores = [];
        var mes = '';

        result.map(function (result) {
          meses.push(result.mes + '/' + result.ano);
          valores.push(result.quantidade);
        });
        meses = meses.sort();
        valores = valores.sort();
        meses.map(function (result2) {
          var i = Number(result2.substring(0, 2));
          mes = month[i - 1];
          meses_processed.push(mes + '/' + result2.substring(5, 8));
        });

        return Promise.resolve({ "meses": meses_processed, "valores": valores });
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  etapasQuantidades: function etapasQuantidades(dados) {
    try {
      return _etapaWorkflowService2.default.getEtapaWorkflow({}).then(function (etapas) {
        if (etapas.length == 0) return Promise.resolve([]);

        etapas = etapas.map(function (etp) {
          return { descricao: etp.descricao, quantidade: 0 };
        });

        dados.guid = '34443981-8681-42f8-9276-f400c3f2282a';
        return _http2.default.get('/api/seguradoras/' + dados.guid + '/relatorios/salvados/passos', {}).then(function (response) {
          if (response.status != 200) {
            throw Error(response.data.message);
          }
          var result = response.data.data;
          var idx = -1;
          etapas.map(function (etp) {
            idx = result.findIndex(function (element, i, arr) {
              return element.descricao === etp.descricao;
            });
            if (idx > -1) etp.quantidade = etp.quantidade + result[idx].quantidade;
            return etp;
          });

          return Promise.resolve(etapas);
        }, function (rejected) {
          if (rejected.response && rejected.response.data !== undefined) {
            if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
              throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
            }
          } else throw Error(rejected.message.toString());
        });
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
exports.default = relatorio;