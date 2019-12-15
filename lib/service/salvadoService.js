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

var _despachanteService = require('./despachanteService');

var _despachanteService2 = _interopRequireDefault(_despachanteService);

var _patioService = require('./patioService');

var _patioService2 = _interopRequireDefault(_patioService);

var _guincheiroService = require('./guincheiroService');

var _guincheiroService2 = _interopRequireDefault(_guincheiroService);

var _oficinaService = require('./oficinaService');

var _oficinaService2 = _interopRequireDefault(_oficinaService);

var _seguradoraService = require('./seguradoraService');

var _seguradoraService2 = _interopRequireDefault(_seguradoraService);

var _workflowService = require('./workflowService');

var _workflowService2 = _interopRequireDefault(_workflowService);

var _etapaWorkflowService = require('./etapaWorkflowService');

var _etapaWorkflowService2 = _interopRequireDefault(_etapaWorkflowService);

var _constantes = require('./constantes');

var _constantes2 = _interopRequireDefault(_constantes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var salvado = {
  // Classe guincheiro
  Salvado: function Salvado() {
    var Salvado = {
      id: 0,
      guid: '',
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      sinistro: '',
      placa: '',
      modelo: '',
      marca: '',
      cor: '',
      ano: -1,
      valorFipe: 0.0,
      apolice: '',
      nomeSegurado: '',
      cidade: '',
      observacoes: '',
      despachante: _despachanteService2.default.Despachante(),
      patio: _patioService2.default.Patio(),
      guincheiro: _guincheiroService2.default.Guincheiro(),
      oficina: _oficinaService2.default.Oficina(),
      seguradora: _seguradoraService2.default.Seguradora(),
      usuario: _acessoService2.default.Usuario(),
      workflow: _workflowService2.default.Workflow(),
      passoEtapa: _etapaWorkflowService2.default.EtapaWorkflow()
    };
    return Salvado;
  },
  EtapaNovo: function EtapaNovo() {
    var EtapaNovo = {
      codigoEtapa: _constantes2.default._CODIGO_ETAPA_NOVO,
      idUsuario: -1,
      guidUsuario: '',
      observacao: '',
      idPassoAtual: -1,
      idPassoDestino: -1,
      guidSalvado: '',
      oficina: _oficinaService2.default.Oficina(),
      patio: _patioService2.default.Patio()
    };
    return EtapaNovo;
  },
  EtapaAguardandoAtribGuincheiro: function EtapaAguardandoAtribGuincheiro() {
    var EtapaAguardandoAtribGuincheiro = {
      codigoEtapa: _constantes2.default._CODIGO_ETAPA_AGUARDANDO_ATRIB_GUINCHEIRO,
      idUsuario: -1,
      guidUsuario: '',
      observacao: '',
      idPassoAtual: -1,
      idPassoDestino: -1,
      guincheiro: _guincheiroService2.default.Guincheiro(),
      guidSalvado: ''
    };
    return EtapaAguardandoAtribGuincheiro;
  },
  EtapaAguardandoGuincho: function EtapaAguardandoGuincho() {
    var EtapaAguardandoGuincho = {
      codigoEtapa: _constantes2.default._CODIGO_ETAPA_AGUARDANDO_GUINCHO,
      idUsuario: -1,
      guidUsuario: '',
      observacao: '',
      idPassoAtual: -1,
      idPassoDestino: -1,
      guincheiro: _guincheiroService2.default.Guincheiro(),
      guidSalvado: ''
    };
    return EtapaAguardandoGuincho;
  },
  EtapaAguardandoAtribDespachante: function EtapaAguardandoAtribDespachante() {
    var EtapaAguardandoAtribDespachante = {
      codigoEtapa: _constantes2.default._CODIGO_ETAPA_AGUARDANDO_ATRIB_DESPACHANTE,
      idUsuario: -1,
      guidUsuario: '',
      observacao: '',
      idPassoAtual: -1,
      idPassoDestino: -1,
      despachante: _despachanteService2.default.Despachante(),
      guidSalvado: ''
    };
    return EtapaAguardandoAtribDespachante;
  },
  EtapaAguardandoDespacho: function EtapaAguardandoDespacho() {
    var EtapaAguardandoDespacho = {
      codigoEtapa: _constantes2.default._CODIGO_ETAPA_AGUARDANDO_DESPACHO,
      idUsuario: -1,
      guidUsuario: '',
      observacao: '',
      idPassoAtual: -1,
      idPassoDestino: -1,
      despachante: _despachanteService2.default.Despachante(),
      guidSalvado: ''
    };
    return EtapaAguardandoDespacho;
  },
  EtapaFinalizado: function EtapaFinalizado() {
    var EtapaFinalizado = {
      codigoEtapa: _constantes2.default._CODIGO_ETAPA_FINALIZADO,
      idUsuario: -1,
      guidUsuario: '',
      observacao: '',
      idPassoAtual: -1,
      idPassoDestino: -1,
      guidSalvado: ''
    };
    return EtapaFinalizado;
  },
  setDefaults: function setDefaults(dados) {
    _seguradoraService2.default.setDefaults(dados.seguradora);
  },
  validar: function validar(dados) {
    var isAlteracao = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isAlteracao && !dados.guid && dados.guid.toString().trim() === '') {
      throw Error('GUID não foi preenchido');
    }

    if (dados.placa.toString().trim() === '') {
      throw Error('PLACA não foi preenchido');
    }

    if (dados.modelo.toString().trim() === '') {
      throw Error('MODELO não foi preenchido');
    }

    if (dados.marca.toString().trim() === '') {
      throw Error('MARCA não foi preenchido');
    }

    if (dados.cor.toString().trim() === '') {
      throw Error('COR não foi preenchido');
    }

    if (dados.apolice.toString().trim() === '') {
      throw Error('APOLICE não foi preenchido');
    }

    if (dados.nomeSegurado.toString().trim() === '') {
      throw Error('NOME SEGURADO não foi preenchido');
    }

    if (!dados.seguradora || !dados.seguradora === {}) {
      throw Error('SEGURADORA não foi preenchido');
    }

    if (!dados.usuario || !dados.usuario === {}) {
      throw Error('USUARIO não foi preenchido');
    }

    if (!dados.workflow || !dados.workflow === {}) {
      throw Error('WORKFLOW não foi preenchido');
    }

    if (!dados.passoEtapa || !dados.passoEtapa === {}) {
      throw Error('ETAPA DO WORKFLOW não foi preenchido');
    }

    var vlFormatted = dados.valorFipe.toLocaleString('pt-BR').replace(".", "|");
    vlFormatted = vlFormatted.replace(",", ".");
    vlFormatted = vlFormatted.replace("|", ",");
    dados.valorFipe = vlFormatted;
  },
  validarEtapa: function validarEtapa(dados) {
    if (!dados.guidSalvado && dados.guidSalvado.toString().trim() === '') {
      throw Error('GUID não foi preenchido');
    }

    if (dados.idUsuario === -1) {
      throw Error('ID USUARIO não foi preenchido');
    }

    if (dados.idPassoAtual === -1) {
      throw Error('ID PASSO ATUAL não foi preenchido');
    }

    if (dados.idPassoDestino === -1) {
      throw Error('ID PASSO DESTINO não foi preenchido');
    }
  },
  incluir: function incluir(dados) {
    try {
      if (!_funcoes2.default.isEquivalentObjects(dados, this.Salvado())) {
        return Promise.reject('Input inválido');
      }

      this.setDefaults(dados);
      this.validar(dados, false);

      // filtra todos os workflows e utiliza o primeiro que encontrar (lógica provisória)
      return _workflowService2.default.listar({}).then(function (workf) {
        if (!workf || workf === {}) return Promise.reject('Não há workflow ativo cadastrado.');
        dados.workflow = workf[0];

        // filtra todas as etapas cadastradas na base de dados
        return _etapaWorkflowService2.default.listar({}).then(function (etapas) {
          // filtra e ordena apenas etapas deste workflow
          if (!etapas || etapas.length === 0) return Promise.reject('Não há etapa inicial cadastrada.');

          etapas = etapas.filter(function (etp) {
            return etp.workflow.id === dados.workflow.id;
          }).sort(function (a, b) {
            return a.ordem - b.ordem;
          });

          if (etapas.length === 0) return Promise.reject('Não há etapa inicial cadastrada para o workflow atual.');

          dados.passoEtapa = etapas[0];
          return _http2.default.post('/api/salvados/', {
            "dataCriacao": dados.dataCriacao,
            "dataAtualizacao": dados.dataAtualizacao,
            "sinistro": dados.sinistro,
            "placa": dados.placa,
            "modelo": dados.modelo,
            "marca": dados.marca,
            "cor": dados.cor,
            "ano": dados.ano,
            "valorFipe": dados.valorFipe,
            "apolice": dados.apolice,
            "nomeSegurado": dados.nomeSegurado,
            "cidade": dados.cidade,
            "observacoes": dados.observacoes,
            "seguradora": { "id": dados.seguradora.id, "guid": dados.seguradora.guid },
            "workflow": { "id": dados.workflow.id },
            "passoEtapa": { "id": dados.passoEtapa.id },
            "usuario": { "id": dados.usuario.id, "guid": dados.usuario.guid }
          }).then(function (response) {
            if (response.status != 200) {
              return Promise.reject(response.data.message);
            }

            return Promise.resolve(response.data);
          }, function (rejected) {
            if (rejected.response && rejected.response.data !== undefined) {
              if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
                return Promise.reject(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
              }
            } else return Promise.reject(rejected.message.toString());
          });
        });
      }).catch(function (err) {
        return Promise.reject(err);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  alterar: function alterar(dados) {
    try {
      if (!_funcoes2.default.isEquivalentObjects(dados, this.Salvado())) {
        return Promise.reject('Input inválido');
      }

      this.validar(dados, true);

      var params = {
        "id": dados.id,
        "guid": dados.guid,
        "dataCriacao": dados.dataCriacao,
        "dataAtualizacao": dados.dataAtualizacao,
        "sinistro": dados.sinistro,
        "placa": dados.placa,
        "modelo": dados.modelo,
        "marca": dados.marca,
        "cor": dados.cor,
        "ano": dados.ano,
        "valorFipe": dados.valorFipe,
        "apolice": dados.apolice,
        "nomeSegurado": dados.nomeSegurado,
        "cidade": dados.cidade,
        "observacoes": dados.observacoes
      };

      if (dados.despachante.id != -1 && dados.despachante.id != null) {
        params.despachante = { id: dados.despachante.id };
      }

      if (dados.patio.id != -1 && dados.patio.id != null) {
        params.patio = { id: dados.patio.id };
      }

      if (dados.guincheiro.id != -1 && dados.guincheiro.id != null) {
        params.guincheiro = { id: dados.guincheiro.id };
      }

      if (dados.oficina.id != -1 && dados.oficina.id != null) {
        params.oficina = { id: dados.oficina.id };
      }

      if (dados.seguradora.id != -1 && dados.seguradora.id != null) {
        params.seguradora = { id: dados.seguradora.id };
      }

      return _http2.default.put('/api/salvados/' + dados.guid, params).then(function (response) {
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
  deletar: function deletar(guid) {
    try {
      return _http2.default.delete('/api/salvados/' + guid).then(function (response) {
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
      var url = '/api/salvados/';
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

        var listSalvados = resultArray.map(function (values) {
          var salv = _this.Salvado();
          salv.id = values.id;
          salv.guid = values.guid;
          if (values.dataCriacao !== undefined && values.dataCriacao !== null && values.dataCriacao !== '') salv.dataCriacao = values.dataCriacao;

          if (values.dataAtualizacao !== undefined && values.dataAtualizacao !== null && values.dataAtualizacao !== '') salv.dataAtualizacao = values.dataAtualizacao;

          salv.sinistro = values.sinistro;
          salv.placa = values.placa;
          salv.modelo = values.modelo;
          salv.marca = values.marca;
          salv.cor = values.cor;
          salv.ano = values.ano;
          salv.valorFipe = values.valorFipe.toFixed(2).replace(".", ",");
          salv.apolice = values.apolice;
          salv.nomeSegurado = values.nomeSegurado;
          salv.cidade = values.cidade;
          salv.observacoes = values.observacoes;
          salv.excluido = values.excluido;
          salv.despachante = _despachanteService2.default.setDespachante(values.despachante);
          salv.patio = _patioService2.default.setPatio(values.patio);
          salv.guincheiro = _guincheiroService2.default.setGuincheiro(values.guincheiro);
          salv.oficina = _oficinaService2.default.setOficina(values.oficina);
          salv.seguradora = _seguradoraService2.default.setSeguradora(values.seguradora);
          salv.usuario = _acessoService2.default.setUsuario(values.usuario);
          salv.workflow = _workflowService2.default.setWorkflow(values.workflow);
          salv.passoEtapa = _etapaWorkflowService2.default.setEtapaWorkflow(values.passoEtapa);

          return salv;
        });

        listSalvados = listSalvados.filter(function (svl) {
          return svl.excluido === false;
        });
        return Promise.resolve(listSalvados);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  realizarAndamento: function realizarAndamento(codigoEtapa, dados) {
    var _this2 = this;

    try {
      return this.listar({ guid: dados.guidSalvado }).then(function (salv) {
        if (salv.length === 0) return Promise.reject('Processo não foi encontrado! GUID:' + dados.guidSalvado);

        var oldSalv = salv[0];
        var newSalv = salv[0];

        switch (codigoEtapa) {
          case _constantes2.default._CODIGO_ETAPA_NOVO:
            if (!_funcoes2.default.isEquivalentObjects(dados, _this2.EtapaNovo())) {
              return Promise.reject('Input inválido');
            }
            newSalv.patio = { id: dados.patio.id };
            newSalv.oficina = { id: dados.oficina.id };
            break;
          case _constantes2.default._CODIGO_ETAPA_AGUARDANDO_ATRIB_GUINCHEIRO:
            if (!_funcoes2.default.isEquivalentObjects(dados, _this2.EtapaAguardandoAtribGuincheiro())) {
              return Promise.reject('Input inválido');
            }
            newSalv.guincheiro = { id: dados.guincheiro.id };
            break;
          case _constantes2.default._CODIGO_ETAPA_AGUARDANDO_GUINCHO:
            if (!_funcoes2.default.isEquivalentObjects(dados, _this2.EtapaAguardandoGuincho())) {
              return Promise.reject('Input inválido');
            }
            break;
          case _constantes2.default._CODIGO_ETAPA_AGUARDANDO_ATRIB_DESPACHANTE:
            if (!_funcoes2.default.isEquivalentObjects(dados, _this2.EtapaAguardandoAtribDespachante())) {
              return Promise.reject('Input inválido');
            }
            newSalv.despachante = { id: dados.despachante.id };
            break;
          case _constantes2.default._CODIGO_ETAPA_AGUARDANDO_DESPACHO:
            if (!_funcoes2.default.isEquivalentObjects(dados, _this2.EtapaAguardandoDespacho())) {
              return Promise.reject('Input inválido');
            }
            break;
          case _constantes2.default._CODIGO_ETAPA_FINALIZADO:
            if (!_funcoes2.default.isEquivalentObjects(dados, _this2.EtapaFinalizado())) {
              return Promise.reject('Input inválido');
            }
            break;
          default:
            break;
        }
        _this2.validarEtapa(dados);

        return _this2.alterar(newSalv).then(function (salv) {
          return _http2.default.put('/api/salvados/' + dados.guidSalvado + '/passos', {
            "observacao": dados.observacao,
            "idUsuario": dados.idUsuario,
            "idPasso": dados.idPassoDestino
          }).then(function (response) {
            if (response.status != 200) {
              return Promise.reject(response.data.message);
            }

            return Promise.resolve(response.data);
          }, function (rejected) {
            if (rejected.response && rejected.response.data !== undefined) {
              if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
                return Promise.reject(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
              }
            } else return Promise.reject(rejected.message.toString());
          });
        }, function (rejected) {
          if (rejected.response && rejected.response.data !== undefined) {
            if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
              return Promise.reject(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
            }
          } else return Promise.reject(rejected.message.toString());
        });
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            return Promise.reject(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else return Promise.reject(rejected.message.toString());
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getHistorico: function getHistorico(dados) {
    try {
      return this.listar({ guid: dados.guid }).then(function (salv) {
        if (salv.length === 0) return Promise.reject('Processo não foi encontrado! GUID:' + dados.guid);

        return _http2.default.get('/api/salvados/' + dados.guid + '/historico', {}).then(function (response) {
          if (response.status != 200) {
            return Promise.reject(response.data.message);
          }

          return Promise.resolve(response.data.data);
        }, function (rejected) {
          if (rejected.response && rejected.response.data !== undefined) {
            if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
              return Promise.reject(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
            }
          } else return Promise.reject(rejected.message.toString());
        });
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            return Promise.reject(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else return Promise.reject(rejected.message.toString());
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
exports.default = salvado;