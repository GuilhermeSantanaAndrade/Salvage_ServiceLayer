import http from '../axios/http'
import workf from './workflowService'
import funcoes from './funcoes'

const etapaWorkflow = {
  EtapaWorkflow() {
    let EtapaWorkflow = {
      id : -1,
      descricao : '',
      descricaoParaFazer: '',
      ordem : -1,
      enviaEmail : false,
      enviaSMS : false,
      linkPushEmail : false,
      tipoEmpresaResponsavel: -1,
      strTpEmpresa: '',
      workflow : workf.Workflow()
    }
    return EtapaWorkflow
  },
  tpEmpresaToString(tpEmpresa) {
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
  strEmpresaToInt(tpEmpresa) {
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
  setEtapaWorkflow(data) {
    let aux = this.EtapaWorkflow();

    aux.id                     = data.id;
    aux.descricao              = data.descricao;
    aux.descricaoParaFazer     = data.descricaoParaFazer;
    aux.ordem                  = data.ordem;
    aux.enviaEmail             = data.enviaEmail;
    aux.enviaSMS               = data.enviaSMS;
    aux.linkPushEmail          = data.linkPushEmail;
    aux.tipoEmpresaResponsavel = data.tipoEmpresaResponsavel;
    aux.strTpEmpresa           = this.tpEmpresaToString(data.tipoEmpresaResponsavel);
    aux.workflow               = workf.setWorkflow(data.workflow);

    return aux;
  },
  getEtapaWorkflow() {
    return workf.listar({}).then(wf => {
      if (!wf || wf === {})
        return Promise.reject('Não há workflow ativo cadastrado.');
      wf = wf[0];

      // filtra todas as etapas cadastradas na base de dados
      return etapaWorkflow.listar({}).then(etapas => {
        // filtra e ordena apenas etapas deste workflow
        if (!etapas || (etapas.length === 0))
          return Promise.reject('Não há etapa inicial cadastrada.');            
        
        return etapas.filter(etp => etp.workflow.id === wf.id).sort((a,b) => (a.ordem - b.ordem));
      })
    })
  },
  validar(dados, isAlteracao = false) {
    if (isAlteracao && dados.id && (dados.id.toString().trim() === '')) {
      throw Error('Id não foi preenchido');
    }

    if (dados.descricao.toString().trim() === '') {
      throw Error('DESCRIÇÃO não foi preenchido');
    }

    if (dados.ordem.toString().trim() === '') {
      throw Error('ORDEM não foi preenchido');
    }
  },
  incluir(dados) {
    try {
      if (!funcoes.isEquivalentObjects(dados, this.EtapaWorkflow())) {
        return Promise.reject('Input inválido')        
      }
      this.validar(dados)

      return http.post('/api/workflowPassos/',
      { "descricao": dados.descricao,
        "descricaoParaFazer": dados.descricaoParaFazer,
        "ordem": dados.ordem,
        "enviaEmail": dados.enviaEmail,
        "enviaSMS": dados.enviaSMS,
        "linkPushEmail": dados.linkPushEmail,
        "tipoEmpresaResponsavel": this.strEmpresaToInt(dados.strTpEmpresa),
        "workflow": dados.workflow
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
      if (!funcoes.isEquivalentObjects(dados, this.EtapaWorkflow())) {
        return Promise.reject('Input inválido')        
      }      
      
      this.validar(dados, true)

      return http.put('/api/workflowPassos/' + dados.id, 
      { "id": dados.id,
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
  deletar(id) {
    try {
      return http.delete('/api/workflowPassos/' + id).then(function (response) {
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
      let url = '/api/workflowPassos/'
      let api_params = {}
      let resultArray = []

      if (funcoes.propsQuantity(dados) === 1) {
        //TEMPLATE_PARAMS
        api_params = dados[funcoes.getPropByIndex(dados, 0).toString()]
        url = url + api_params
      } else {
        //QUERY_PARAMS
        if (typeof dados.id === 'number')
          api_params = { id: dados.id }
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

        let listEtapas = resultArray.map(values => {
          let etapa = this.setEtapaWorkflow(values);
          return etapa;
        });

        return Promise.resolve(listEtapas);
      })
    } catch (err) {
      return Promise.reject(err)
    }    
  }
}

export default etapaWorkflow