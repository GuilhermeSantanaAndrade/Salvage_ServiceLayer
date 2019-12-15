import http from '../axios/http'
import funcoes from './funcoes'
import acesso from './acessoService'
import end from './enderecoService'
import contato from './contatoService'

const guincheiro = {
  // Classe guincheiro
  Guincheiro() {
    let Guincheiro = {
      id : -1,
      guid    : '',
      tipo_entidade : '',
      nome : '',
      tipo_pessoa : '',
      cpf_cnpj : '',
      ie : '',
      dataCriacao : new Date(),
      dataAtualizacao : new Date(),
      endereco : end.Endereco(),
      email : '',
      telefone : '',
      ativo : true,
      contatos : [contato.Contato()],
      usuario : acesso.Usuario()
    }
    return Guincheiro
  },
  setGuincheiro(data) {
    let aux = this.Guincheiro();
    if (data === null)
      return aux    
    aux.id = data.id;
    aux.guid = data.guid;
    aux.tipo_entidade = data.tipo_entidade;
    aux.nome = data.nome;
    aux.tipo_pessoa = data.tipo_pessoa;
    aux.cpf_cnpj = data.cnpJ_CPF;
    aux.ie = data.ie;
    aux.dataCriacao = data.dataCriacao;
    aux.dataAtualizacao = data.dataAtualizacao;
    aux.endereco = end.setEndereco(data);
    aux.email = data.email;
    aux.telefone = data.telefone;
    aux.ativo = data.ativo;
    //aux.contatos = data.contato.map(result => {
    //  return contato.setContato(result)
    //}),
    //aux.usuario = acesso.setUsuario(data.usuario)
    return aux;
  },
  setDefaults(dados) {
    if ((dados.tipo_entidade === undefined) || (dados.tipo_entidade.toString() === ''))
      dados.tipo_entidade = 'Guincheiro'

    if ((!dados.tipo_pessoa === undefined) ||  (dados.tipo_pessoa.toString() === ''))
      dados.tipo_pessoa = 'PF'

    if (typeof dados.ativo !== 'boolean')
      dados.ativo = true
    
    end.setDefaults(dados.endereco)
  },  
  validar(dados, isAlteracao = false) {
    if (isAlteracao && dados.guid && (dados.guid.toString().trim() === '')) {
      throw Error('GUID não foi preenchido');
    }

    if (dados.nome.toString().trim() === '') {
      throw Error('NOME não foi preenchido');
    }

    if (dados.tipo_pessoa && (dados.tipo_pessoa.toString().trim() === '')) {
      throw Error('TIPO PESSOA não foi preenchido');
    }
    
    if (dados.cpf_cnpj && (dados.cpf_cnpj.toString().trim() === '')) {
      throw Error('CPF/CNPJ não foi preenchido');
    }

    if (dados.tipo_pessoa === 'PF') {
      if (!funcoes.validaCPF(dados.cpf_cnpj))
        throw Error('CPF inválido');
    } else {
      if (!funcoes.validaCNPJ(dados.cpf_cnpj))
        throw Error('CNPJ inválido');
    }

    if (dados.email && (funcoes.validaEmail(dados.email))) {
      throw Error('E-mail não foi preenchido');
    }

    if (dados.endereco) {
      end.validar(dados.endereco, isAlteracao)
    }

    //if (dados.usuario) {
    //  funcoes.validaEmail(dados.usuario.email)
    //  funcoes.validaSenha(dados.usuario.senha)
    //  acesso.validar(dados.usuario)
    //}
  },
  incluir(dados) {
    try {    
      if (!funcoes.isEquivalentObjects(dados, this.Guincheiro())) {
        return Promise.reject('Input inválido')        
      }
      
      this.setDefaults(dados)
      this.validar(dados)

      return http.post('/api/guincheiros/',
      { "tipoEmpresa": dados.tipo_entidade,
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
          throw Error(response.data.message)
        } 
      
        return Promise.resolve(response.data);
      },
      rejected => {
        if (rejected.response && (rejected.response.data !== undefined)) {
          if (funcoes.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()])
          }
        } else
          throw Error(rejected.message.toString())
      });
    } catch (err) {
      return Promise.reject(err)
    }
  },
  alterar(dados) {
    try {
      if (!funcoes.isEquivalentObjects(dados, this.Guincheiro())) {
        return Promise.reject('Input inválido')        
      }      
      
      this.validar(dados, true)

      return http.put('/api/guincheiros/' + dados.guid, 
      { "id": dados.id,
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
          throw Error(response.data.message)
        } 
      
        return Promise.resolve(response.data);
      },
      rejected => {
        if (rejected.response && (rejected.response.data !== undefined)) {
          if (funcoes.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()])
          }
        } else
          throw Error(rejected.message.toString())
      });
    } catch (err) {
      return Promise.reject(err)
    }
  },
  deletar(guid) {
    try {
      return http.delete('/api/guincheiros/' + guid).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message)
        } 
      
        return Promise.resolve(true);
      },
      rejected => {
        if (rejected.response && (rejected.response.data !== undefined)) {
          if (funcoes.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()])
          }
        } else
          throw Error(rejected.message.toString())
      });
    } catch (err) {
      return Promise.reject(err)
    }
  },
  listar(dados) {
    try {
      let url = '/api/guincheiros/'
      let api_params = {}
      let resultArray = []

      if (funcoes.propsQuantity(dados) === 1) {
        //TEMPLATE_PARAMS
        api_params = dados[funcoes.getPropByIndex(dados, 0).toString()]
        url = url + api_params
      } else {
        //QUERY_PARAMS
        if ((typeof dados.guid === 'string') && (dados.guid.toString() !== ''))
          api_params = { guid: dados.guid }
      }

      return http.get(url, api_params).then(response => {
        if (response.status != 200) {
          throw Error(response.data.message)
        }        
      
        if ((response.data.data == undefined) || (response.data.data == null ))
          throw Error('Retorno da API inválido')

        if (Array.isArray(response.data.data))
          resultArray = response.data.data
        else
          resultArray.push(response.data.data)

        let listGuincheiros = resultArray.map(values => {
          let guin = this.Guincheiro();

          guin.id            = values.id;
          guin.guid          = values.guid;
          guin.tipo_entidade = values.tipoEmpresa;
          guin.nome          = values.nome;
          guin.tipo_pessoa   = (values.tipoPessoa === 0 ? 'PJ' : 'PF');
          guin.cpf_cnpj      = values.cnpJ_CPF;
          guin.ie            = values.ie;
          if ((values.dataCriacao !== undefined) && (values.dataCriacao !== null) && (values.dataCriacao !== ''))
            guin.dataCriacao = values.dataCriacao;

          if ((values.dataAtualizacao !== undefined) && (values.dataAtualizacao !== null) && (values.dataAtualizacao !== ''))
            guin.dataAtualizacao  = values.dataAtualizacao;
          
          guin.endereco.logradouro  = values.endereco;
          guin.endereco.numero      = values.enderecoNumero;
          guin.endereco.complemento = values.complemento;
          guin.endereco.bairro      = values.bairro;
          guin.endereco.cidade      = values.cidade;
          guin.endereco.uf          = values.uf;
          guin.endereco.cep         = values.cep;
          guin.endereco.latitude    = values.latitude;
          guin.endereco.longitude   = values.longitude;

          guin.telefone     = values.telefone;          
          guin.email        = values.email;
          guin.ativo        = values.ativo;

          //if (!funcoes.isEmptyObject(values.usuario))
          //  guin.usuario     = values.usuario;

          return guin;
        });

        return Promise.resolve(listGuincheiros);
      })
    } catch (err) {
      return Promise.reject(err)
    }    
  }
}
export default guincheiro