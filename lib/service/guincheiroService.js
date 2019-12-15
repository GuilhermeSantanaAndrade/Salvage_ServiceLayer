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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guincheiro = {
  // Classe guincheiro
  Guincheiro: function Guincheiro() {
    var Guincheiro = {
      id: -1,
      guid: '',
      tipo_entidade: '',
      nome: '',
      tipo_pessoa: '',
      cpf_cnpj: '',
      ie: '',
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      endereco: _enderecoService2.default.Endereco(),
      email: '',
      telefone: '',
      ativo: true,
      contatos: [_contatoService2.default.Contato()],
      usuario: _acessoService2.default.Usuario()
    };
    return Guincheiro;
  },
  setGuincheiro: function setGuincheiro(data) {
    var aux = this.Guincheiro();
    if (data === null) return aux;
    aux.id = data.id;
    aux.guid = data.guid;
    aux.tipo_entidade = data.tipo_entidade;
    aux.nome = data.nome;
    aux.tipo_pessoa = data.tipo_pessoa;
    aux.cpf_cnpj = data.cnpJ_CPF;
    aux.ie = data.ie;
    aux.dataCriacao = data.dataCriacao;
    aux.dataAtualizacao = data.dataAtualizacao;
    aux.endereco = _enderecoService2.default.setEndereco(data);
    aux.email = data.email;
    aux.telefone = data.telefone;
    aux.ativo = data.ativo;
    //aux.contatos = data.contato.map(result => {
    //  return contato.setContato(result)
    //}),
    //aux.usuario = acesso.setUsuario(data.usuario)
    return aux;
  },
  setDefaults: function setDefaults(dados) {
    if (dados.tipo_entidade === undefined || dados.tipo_entidade.toString() === '') dados.tipo_entidade = 'Guincheiro';

    if (!dados.tipo_pessoa === undefined || dados.tipo_pessoa.toString() === '') dados.tipo_pessoa = 'PF';

    if (typeof dados.ativo !== 'boolean') dados.ativo = true;

    _enderecoService2.default.setDefaults(dados.endereco);
  },
  validar: function validar(dados) {
    var isAlteracao = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isAlteracao && dados.guid && dados.guid.toString().trim() === '') {
      throw Error('GUID não foi preenchido');
    }

    if (dados.nome.toString().trim() === '') {
      throw Error('NOME não foi preenchido');
    }

    if (dados.tipo_pessoa && dados.tipo_pessoa.toString().trim() === '') {
      throw Error('TIPO PESSOA não foi preenchido');
    }

    if (dados.cpf_cnpj && dados.cpf_cnpj.toString().trim() === '') {
      throw Error('CPF/CNPJ não foi preenchido');
    }

    if (dados.tipo_pessoa === 'PF') {
      if (!_funcoes2.default.validaCPF(dados.cpf_cnpj)) throw Error('CPF inválido');
    } else {
      if (!_funcoes2.default.validaCNPJ(dados.cpf_cnpj)) throw Error('CNPJ inválido');
    }

    if (dados.email && _funcoes2.default.validaEmail(dados.email)) {
      throw Error('E-mail não foi preenchido');
    }

    if (dados.endereco) {
      _enderecoService2.default.validar(dados.endereco, isAlteracao);
    }

    //if (dados.usuario) {
    //  funcoes.validaEmail(dados.usuario.email)
    //  funcoes.validaSenha(dados.usuario.senha)
    //  acesso.validar(dados.usuario)
    //}
  },
  incluir: function incluir(dados) {
    try {
      if (!_funcoes2.default.isEquivalentObjects(dados, this.Guincheiro())) {
        return Promise.reject('Input inválido');
      }

      this.setDefaults(dados);
      this.validar(dados);

      return _http2.default.post('/api/guincheiros/', { "tipoEmpresa": dados.tipo_entidade,
        "tipoPessoa": dados.tipo_pessoa,
        "nome": dados.nome,
        "cnpJ_CPF": dados.cpf_cnpj,
        "ie": dados.ie,
        "dataCriacao": dados.dataCriacao,
        "dataAtualizacao": dados.dataAtualizacao,
        "endereco": dados.endereco.logradouro,
        "cidade": dados.endereco.cidade,
        "uf": dados.endereco.uf,
        "cep": dados.endereco.cep,
        "enderecoNumero": dados.endereco.numero,
        "bairro": dados.endereco.bairro,
        "complemento": dados.endereco.complemento,
        "latitude": dados.endereco.latitude,
        "longitude": dados.endereco.longitude,
        "email": dados.email,
        "telefone": dados.telefone,
        "ativo": dados.ativo
        /*"contatos": [
          {
            "guid": "string",
            "nome": "string",
            "celular": "string",
            "email": "string",
            "dataCriacao": "2019-05-10T02:42:35.384Z",
            "dataAtualizacao": "2019-05-10T02:42:35.384Z"
          }
        ]*/
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
      if (!_funcoes2.default.isEquivalentObjects(dados, this.Guincheiro())) {
        return Promise.reject('Input inválido');
      }

      this.validar(dados, true);

      return _http2.default.put('/api/guincheiros/' + dados.guid, { "id": dados.id,
        "guid": dados.guid,
        "tipoEmpresa": dados.tipo_entidade,
        "tipoPessoa": dados.tipo_pessoa,
        "nome": dados.nome,
        "cnpJ_CPF": dados.cpf_cnpj,
        "ie": dados.ie,
        "dataCriacao": dados.dataCriacao,
        "dataAtualizacao": dados.dataAtualizacao,
        "endereco": dados.endereco.logradouro,
        "cidade": dados.endereco.cidade,
        "uf": dados.endereco.uf,
        "cep": dados.endereco.cep,
        "enderecoNumero": dados.endereco.numero,
        "bairro": dados.endereco.bairro,
        "complemento": dados.endereco.complemento,
        "latitude": dados.endereco.latitude,
        "longitude": dados.endereco.longitude,
        "email": dados.email,
        "telefone": dados.telefone,
        "ativo": dados.ativo
        /*"contatos": [
          {
            "guid": "string",
            "nome": "string",
            "celular": "string",
            "email": "string",
            "dataCriacao": "2019-05-10T02:42:35.384Z",
            "dataAtualizacao": "2019-05-10T02:42:35.384Z"
          }
        ]*/
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
  deletar: function deletar(guid) {
    try {
      return _http2.default.delete('/api/guincheiros/' + guid).then(function (response) {
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
      var url = '/api/guincheiros/';
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

        var listGuincheiros = resultArray.map(function (values) {
          var guin = _this.Guincheiro();

          guin.id = values.id;
          guin.guid = values.guid;
          guin.tipo_entidade = values.tipoEmpresa;
          guin.nome = values.nome;
          guin.tipo_pessoa = values.tipoPessoa === 0 ? 'PJ' : 'PF';
          guin.cpf_cnpj = values.cnpJ_CPF;
          guin.ie = values.ie;
          if (values.dataCriacao !== undefined && values.dataCriacao !== null && values.dataCriacao !== '') guin.dataCriacao = values.dataCriacao;

          if (values.dataAtualizacao !== undefined && values.dataAtualizacao !== null && values.dataAtualizacao !== '') guin.dataAtualizacao = values.dataAtualizacao;

          guin.endereco.logradouro = values.endereco;
          guin.endereco.numero = values.enderecoNumero;
          guin.endereco.complemento = values.complemento;
          guin.endereco.bairro = values.bairro;
          guin.endereco.cidade = values.cidade;
          guin.endereco.uf = values.uf;
          guin.endereco.cep = values.cep;
          guin.endereco.latitude = values.latitude;
          guin.endereco.longitude = values.longitude;

          guin.telefone = values.telefone;
          guin.email = values.email;
          guin.ativo = values.ativo;

          //if (!funcoes.isEmptyObject(values.usuario))
          //  guin.usuario     = values.usuario;

          return guin;
        });

        return Promise.resolve(listGuincheiros);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
exports.default = guincheiro;