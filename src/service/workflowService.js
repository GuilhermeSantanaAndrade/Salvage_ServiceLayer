import http from '../axios/http'
import funcoes from './funcoes'
import acesso from './acessoService'

const workflow = {
  Workflow() {
    let Workflow = {
      'id': 0,
      'guid': '',
      'descricao': '',
      'dataCriacao': new Date(),
      'dataAtualizacao': new Date(),
      'passos': [],
      'empresaPertencente': {},
      'usuario': acesso.Usuario()
    }
    return Workflow
  },
  setWorkflow(data) {
    let aux = this.Workflow();

    aux.id                 = data.id;
    aux.guid               = data.guid;
    aux.descricao          = data.descricao;
    aux.passos             = data.passos;
    aux.empresaPertencente = data.empresaPertencente;

    if ((data.dataCriacao !== undefined) && (data.dataCriacao !== null) && (data.dataCriacao !== ''))
      aux.dataCriacao = data.dataCriacao;

    if ((data.dataAtualizacao !== undefined) && (data.dataAtualizacao !== null) && (data.dataAtualizacao !== ''))
      aux.dataAtualizacao  = data.dataAtualizacao;

    if (!funcoes.isEmptyObject(data.usuario)) {
      aux.usuario = acesso.setUsuario(data.usuario);
    }

    return aux;
  },
  listar(dados) {
    try {
      let url = '/api/workflows/'
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

        let listWorkflows = resultArray.map(values => {
          let workf = this.setWorkflow(values);
          return workf;
        });

        return Promise.resolve(listWorkflows);
      })
    } catch (err) {
      return Promise.reject(err)
    }
  },
  listarPassos(guid) {
    try {
      let url = '/api/workflows/' + guid + '/passos'
      let api_params = {}
      let resultArray = []

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

        let listWorkflows = resultArray.map(values => {
          let workf = this.setWorkflow(values);
          return workf;
        });

        return Promise.resolve(listWorkflows);
      })
    } catch (err) {
      return Promise.reject(err)
    }    
  }
}

export default workflow