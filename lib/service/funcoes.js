'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('../axios/http');

var _http2 = _interopRequireDefault(_http);

var _enderecoService = require('./enderecoService');

var _enderecoService2 = _interopRequireDefault(_enderecoService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var funcoes = {
  validaEmail: function validaEmail(email) {
    if (email === undefined || email === '') throw 'E-mail não foi informado';

    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.toLowerCase())) {
      throw 'E-mail inválido';
    }
  },
  validaSenha: function validaSenha(senha) {
    var validaRequisitosMinimos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (senha === undefined || senha === '') throw 'Senha não foi informada';

    var regex = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{4,15}$/;
    if (validaRequisitosMinimos && !regex.test(senha)) {
      throw 'Senha não cumpre os requisitos mínimos';
    }
  },
  isEmptyObject: function isEmptyObject(obj) {
    return !obj || obj && Object.keys(obj).length === 0;
  },
  isEquivalentObjects: function isEquivalentObjects(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    var propName;
    for (var i = 0; i < bProps.length; i++) {
      propName = bProps[i];

      if (aProps.indexOf(propName) == -1) {
        return false;
      }
    }

    return true;
  },
  getPropListByObject: function getPropListByObject(obj) {
    return Object.getOwnPropertyNames(obj);
  },
  propsQuantity: function propsQuantity(obj) {
    var props = Object.getOwnPropertyNames(obj);

    return props.length;
  },
  getPropByIndex: function getPropByIndex(obj, idx) {
    var keys = Object.keys(obj);
    return keys[idx];
  },
  applyCPFMask: function applyCPFMask(value) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
  },
  applyCNPJMask: function applyCNPJMask(value) {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
  },
  applyCNPJ_or_CPFMask: function applyCNPJ_or_CPFMask(value) {
    if (!value) value = '';

    if (value.length <= 11) return this.applyCPFMask(value);else return this.applyCNPJMask(value);
  },
  removeMask: function removeMask(value) {
    return value.replace(/(\.|\/|\-)/g, "");
  },
  hasProp: function hasProp(obj, prop) {
    return obj.hasOwnProperty(prop.toString());
  },
  getParameterByName: function getParameterByName(url, name) {
    if (!url) {
      name = name.replace(/[\]]/g, '\\$&');
    }
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },
  buscaCEP: function buscaCEP(cep) {
    try {

      var url = 'https://viacep.com.br/ws/' + cep + '/json/';
      var resultArray = [];

      return _http2.default.get(url).then(function (response) {
        if (response.status != 200) {
          var e = _enderecoService2.default.Endereco();
          return Promise.resolve(e);
        }

        if (response.data == undefined || response.data == null) throw Error('Retorno da API inválido');

        if (Array.isArray(response.data)) resultArray = response.data;else resultArray.push(response.data);

        var enderecoFound = resultArray.map(function (values) {
          var e = _enderecoService2.default.Endereco();
          e.logradouro = values.logradouro;
          e.complemento = values.complemento;
          e.bairro = values.bairro;
          e.cidade = values.localidade;
          e.uf = values.uf;
          e.cep = values.cep;
          return e;
        });
        return Promise.resolve(enderecoFound);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  validaCPF: function validaCPF(cpf) {
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (var i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }Resto = Soma * 10 % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }Resto = Soma * 10 % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  },
  validaCNPJ: function validaCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999") return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }
};

exports.default = funcoes;