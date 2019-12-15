import http from '../axios/http'
import funcoes from './funcoes'
import acesso from './acessoService'
import end from './enderecoService'
import contato from './contatoService'

const seguradora = {
  Seguradora() {
    let Seguradora = {
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
    return Seguradora
  },
  setSeguradora(data) {
    let aux = this.Seguradora();
    aux.id = data.id;
    aux.guid = data.guid;
    aux.tipo_entidade = data.tipo_entidade,
    aux.nome = data.nome,
    aux.tipo_pessoa = data.tipo_pessoa,
    aux.cpf_cnpj = data.cpf_cnpj,
    aux.ie = data.ie,
    aux.dataCriacao = data.dataCriacao,
    aux.dataAtualizacao = data.dataAtualizacao,
    aux.endereco = data.endereco,
    aux.email = data.email
    aux.telefone = data.telefone
    aux.ativo = data.ativo
    //aux.contatos = data.contato.map(result => {
    //  return contato.setContato(result)
    //}),
    //aux.usuario = acesso.setUsuario(data.usuario)
    return aux;
  },
  setDefaults(dados) {
    if ((dados.tipo_entidade === undefined) || (dados.tipo_entidade.toString() === ''))
      dados.tipo_entidade = 'Seguradora'

    if ((!dados.tipo_pessoa === undefined) ||  (dados.tipo_pessoa.toString() === ''))
      dados.tipo_pessoa = 'PJ'

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
    
    if (dados.cpf && (dados.cpf.toString().trim() === '')) {
      throw Error('CPF não foi preenchido');
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
      if (!funcoes.isEquivalentObjects(dados, this.Seguradora())) {
        return Promise.reject('Input inválido')        
      }
      
      this.setDefaults(dados)
      this.validar(dados)

      return http.post('/api/seguradoras/',
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
      if (!funcoes.isEquivalentObjects(dados, this.Seguradora())) {
        return Promise.reject('Input inválido')        
      }      
      
      this.validar(dados, true)

      return http.put('/api/seguradoras/' + dados.guid, 
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
       },
       rejected => {
        if (rejected.response && (rejected.response.data !== undefined)) {
           if (funcoes.propsQuantity(rejected.response.data) > 0) {
             throw Error(rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()])
           }
         } else
           throw Error(rejected.message.toString())
       }).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message)
        } 
      
        return Promise.resolve(response.data);
      });
    } catch (err) {
      return Promise.reject(err)
    }
  },
  deletar(guid) {
    try {
      return http.delete('/api/seguradoras/' + guid).then(function (response) {
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
      let url = '/api/seguradoras/'
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

        let listSeguradoras = resultArray.map(values => {
          let seg = this.Seguradora();

          seg.id            = values.id;
          seg.guid          = values.guid;
          seg.tipo_entidade = values.tipoEmpresa;
          seg.nome          = values.nome;
          seg.tipo_pessoa   = values.tipo_pessoa || 'PJ';
          seg.cpf_cnpj      = values.cnpJ_CPF;
          seg.ie            = values.ie;
          if ((values.dataCriacao !== undefined) && (values.dataCriacao !== null) && (values.dataCriacao !== ''))
            seg.dataCriacao = values.dataCriacao;

          if ((values.dataAtualizacao !== undefined) && (values.dataAtualizacao !== null) && (values.dataAtualizacao !== ''))
            seg.dataAtualizacao  = values.dataAtualizacao;
          
          seg.endereco.logradouro  = values.endereco;
          seg.endereco.numero      = values.enderecoNumero;
          seg.endereco.complemento = values.complemento;
          seg.endereco.bairro      = values.bairro;
          seg.endereco.cidade      = values.cidade;
          seg.endereco.uf          = values.uf;
          seg.endereco.cep         = values.cep;
          seg.endereco.latitude    = values.latitude;
          seg.endereco.longitude   = values.longitude;

          seg.telefone     = values.telefone;          
          seg.email        = values.email;
          seg.ativo        = values.ativo;

          //if (!funcoes.isEmptyObject(values.usuario))
          //  seg.usuario     = values.usuario;

          return seg;
        });

        return Promise.resolve(listSeguradoras);
      })
    } catch (err) {
      return Promise.reject(err)
    }    
  }
}

export default seguradora