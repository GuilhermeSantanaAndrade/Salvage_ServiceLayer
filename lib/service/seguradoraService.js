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

var seguradora = {
  Seguradora: function Seguradora() {
    var Seguradora = {
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
    return Seguradora;
  },
  setSeguradora: function setSeguradora(data) {
    var aux = this.Seguradora();
    aux.id = data.id;
    aux.guid = data.guid;
    aux.tipo_entidade = data.tipo_entidade, aux.nome = data.nome, aux.tipo_pessoa = data.tipo_pessoa, aux.cpf_cnpj = data.cpf_cnpj, aux.ie = data.ie, aux.dataCriacao = data.dataCriacao, aux.dataAtualizacao = data.dataAtualizacao, aux.endereco = data.endereco, aux.email = data.email;
    aux.telefone = data.telefone;
    aux.ativo = data.ativo;
    //aux.contatos = data.contato.map(result => {
    //  return contato.setContato(result)
    //}),
    //aux.usuario = acesso.setUsuario(data.usuario)
    return aux;
  },
  setDefaults: function setDefaults(dados) {
    if (dados.tipo_entidade === undefined || dados.tipo_entidade.toString() === '') dados.tipo_entidade = 'Seguradora';

    if (!dados.tipo_pessoa === undefined || dados.tipo_pessoa.toString() === '') dados.tipo_pessoa = 'PJ';

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

    if (dados.cpf && dados.cpf.toString().trim() === '') {
      throw Error('CPF não foi preenchido');
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
      if (!_funcoes2.default.isEquivalentObjects(dados, this.Seguradora())) {
        return Promise.reject('Input inválido');
      }

      this.setDefaults(dados);
      this.validar(dados);

      return _http2.default.post('/api/seguradoras/', { "tipoEmpresa": dados.tipo_entidade,
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
      if (!_funcoes2.default.isEquivalentObjects(dados, this.Seguradora())) {
        return Promise.reject('Input inválido');
      }

      this.validar(dados, true);

      return _http2.default.put('/api/seguradoras/' + dados.guid, { "id": dados.id,
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
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else throw Error(rejected.message.toString());
      }).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        return Promise.resolve(response.data);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  deletar: function deletar(guid) {
    try {
      return _http2.default.delete('/api/seguradoras/' + guid).then(function (response) {
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
      var url = '/api/seguradoras/';
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

        var listSeguradoras = resultArray.map(function (values) {
          var seg = _this.Seguradora();

          seg.id = values.id;
          seg.guid = values.guid;
          seg.tipo_entidade = values.tipoEmpresa;
          seg.nome = values.nome;
          seg.tipo_pessoa = values.tipo_pessoa || 'PJ';
          seg.cpf_cnpj = values.cnpJ_CPF;
          seg.ie = values.ie;
          if (values.dataCriacao !== undefined && values.dataCriacao !== null && values.dataCriacao !== '') seg.dataCriacao = values.dataCriacao;

          if (values.dataAtualizacao !== undefined && values.dataAtualizacao !== null && values.dataAtualizacao !== '') seg.dataAtualizacao = values.dataAtualizacao;

          seg.endereco.logradouro = values.endereco;
          seg.endereco.numero = values.enderecoNumero;
          seg.endereco.complemento = values.complemento;
          seg.endereco.bairro = values.bairro;
          seg.endereco.cidade = values.cidade;
          seg.endereco.uf = values.uf;
          seg.endereco.cep = values.cep;
          seg.endereco.latitude = values.latitude;
          seg.endereco.longitude = values.longitude;

          seg.telefone = values.telefone;
          seg.email = values.email;
          seg.ativo = values.ativo;

          //if (!funcoes.isEmptyObject(values.usuario))
          //  seg.usuario     = values.usuario;

          return seg;
        });

        return Promise.resolve(listSeguradoras);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

exports.default = seguradora;