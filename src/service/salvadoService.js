import http from '../axios/http'
import funcoes from './funcoes'
import acesso from './acessoService'
import end from './enderecoService'
import contato from './contatoService'
import despa from './despachanteService'
import patio from './patioService'
import guin from './guincheiroService'
import oficina from './oficinaService'
import seguradora from './seguradoraService'
import workflow from './workflowService'
import etapaWorkflow from './etapaWorkflowService'
import constantes from './constantes'

const salvado = {
  // Classe guincheiro
  Salvado() {
    let Salvado = {
      id : 0,
      guid : '',
      dataCriacao :  new Date(),
      dataAtualizacao :  new Date(),
      sinistro : '',
      placa : '',
      modelo : '',
      marca : '',
      cor : '',
      ano : -1,
      valorFipe : 0.0,
      apolice : '',
      nomeSegurado  : '',
      cidade : '',
      observacoes : '',
      despachante: despa.Despachante(),
      patio: patio.Patio(),
      guincheiro: guin.Guincheiro(),
      oficina: oficina.Oficina(),
      seguradora: seguradora.Seguradora(),
      usuario: acesso.Usuario(),
      workflow: workflow.Workflow(),
      passoEtapa: etapaWorkflow.EtapaWorkflow()
    }
    return Salvado
  },
  EtapaNovo() {
    let EtapaNovo = {
      codigoEtapa: constantes._CODIGO_ETAPA_NOVO,
      idUsuario : -1,
      guidUsuario : '',
      observacao :  '',
      idPassoAtual : -1,
      idPassoDestino : -1,
      guidSalvado: '',
      oficina: oficina.Oficina(),
      patio: patio.Patio()
    }
    return EtapaNovo
  },  
  EtapaAguardandoAtribGuincheiro() {
    let EtapaAguardandoAtribGuincheiro = {
      codigoEtapa: constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_GUINCHEIRO,
      idUsuario : -1,
      guidUsuario : '',
      observacao :  '',
      idPassoAtual : -1,
      idPassoDestino : -1,
      guincheiro: guin.Guincheiro(),
      guidSalvado: ''
    }
    return EtapaAguardandoAtribGuincheiro
  },
  EtapaAguardandoGuincho() {
    let EtapaAguardandoGuincho = {
      codigoEtapa: constantes._CODIGO_ETAPA_AGUARDANDO_GUINCHO,
      idUsuario : -1,
      guidUsuario : '',
      observacao :  '',
      idPassoAtual : -1,
      idPassoDestino : -1,
      guincheiro: guin.Guincheiro(),
      guidSalvado: ''
    }
    return EtapaAguardandoGuincho
  },
  EtapaAguardandoAtribDespachante() {
    let EtapaAguardandoAtribDespachante = {
      codigoEtapa: constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_DESPACHANTE,
      idUsuario : -1,
      guidUsuario : '',
      observacao :  '',
      idPassoAtual : -1,
      idPassoDestino : -1,
      despachante: despa.Despachante(),
      guidSalvado: ''
    }
    return EtapaAguardandoAtribDespachante
  },
  EtapaAguardandoDespacho() {
    let EtapaAguardandoDespacho = {
      codigoEtapa: constantes._CODIGO_ETAPA_AGUARDANDO_DESPACHO,
      idUsuario : -1,
      guidUsuario : '',
      observacao :  '',
      idPassoAtual : -1,
      idPassoDestino : -1,
      despachante: despa.Despachante(),
      guidSalvado: ''
    }
    return EtapaAguardandoDespacho
  },  
  EtapaFinalizado() {
    let EtapaFinalizado = {
      codigoEtapa: constantes._CODIGO_ETAPA_FINALIZADO,
      idUsuario : -1,
      guidUsuario : '',
      observacao :  '',
      idPassoAtual : -1,
      idPassoDestino : -1,
      guidSalvado: ''
    }
    return EtapaFinalizado
  },
  setDefaults(dados) {
    seguradora.setDefaults(dados.seguradora)
  },  
  validar(dados, isAlteracao = false) {
    if (isAlteracao && !dados.guid && (dados.guid.toString().trim() === '')) {
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
  validarEtapa(dados) {
    if (!dados.guidSalvado && (dados.guidSalvado.toString().trim() === '')) {
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
  incluir(dados) {
    try {
      if (!funcoes.isEquivalentObjects(dados, this.Salvado())) {
        return Promise.reject('Input inválido')
      }
      
      this.setDefaults(dados)
      this.validar(dados, false)

      // filtra todos os workflows e utiliza o primeiro que encontrar (lógica provisória)
      return workflow.listar({}).then(workf => {
        if (!workf || workf === {})
          return Promise.reject('Não há workflow ativo cadastrado.');
        dados.workflow = workf[0];

        // filtra todas as etapas cadastradas na base de dados
        return etapaWorkflow.listar({}).then(etapas => {
          // filtra e ordena apenas etapas deste workflow
          if (!etapas || (etapas.length === 0))
            return Promise.reject('Não há etapa inicial cadastrada.');            
          
          etapas = etapas.filter(etp => etp.workflow.id === dados.workflow.id).sort((a,b) => (a.ordem - b.ordem));

          if (etapas.length === 0)
            return Promise.reject('Não há etapa inicial cadastrada para o workflow atual.');

          dados.passoEtapa = etapas[0];
          return http.post('/api/salvados/',
          {
            "dataCriacao" :	dados.dataCriacao,
            "dataAtualizacao" :	dados.dataAtualizacao,
            "sinistro"	: dados.sinistro,
            "placa" :	dados.placa,
            "modelo" :	dados.modelo,
            "marca" :	dados.marca,
            "cor":	dados.cor,
            "ano":	dados.ano,
            "valorFipe":	dados.valorFipe,
            "apolice":	dados.apolice,
            "nomeSegurado":	dados.nomeSegurado,
            "cidade":	dados.cidade,
            "observacoes":	dados.observacoes,
            "seguradora" : {"id": dados.seguradora.id, "guid": dados.seguradora.guid},
            "workflow" : {"id": dados.workflow.id},
            "passoEtapa": {"id": dados.passoEtapa.id},
            "usuario" : {"id": dados.usuario.id, "guid": dados.usuario.guid}
          }).then(function (response) {
            if (response.status != 200) {
              return Promise.reject(response.data.message)
            } 
          
            return Promise.resolve(response.data);
          },
          rejected => {
            if (rejected.response && (rejected.response.data !== undefined)) {
              if (funcoes.propsQuantity(rejected.response.data) > 0) {
                return Promise.reject((rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()]))
              }
            } else
            return Promise.reject(rejected.message.toString())
          });  
        })
      }).catch(err => {
        return Promise.reject(err)
      })
    } catch (err) {
      return Promise.reject(err)
    }
  },
  alterar(dados) {
    try {
      if (!funcoes.isEquivalentObjects(dados, this.Salvado())) {
        return Promise.reject('Input inválido')        
      }
      
      this.validar(dados, true)

      let params = {
        "id" :	dados.id,
        "guid" :	dados.guid,
        "dataCriacao" :	dados.dataCriacao,
        "dataAtualizacao" :	dados.dataAtualizacao,
        "sinistro"	: dados.sinistro,
        "placa" :	dados.placa,
        "modelo" :	dados.modelo,
        "marca" :	dados.marca,
        "cor":	dados.cor,
        "ano":	dados.ano,
        "valorFipe":	dados.valorFipe,
        "apolice":	dados.apolice,
        "nomeSegurado":	dados.nomeSegurado,
        "cidade":	dados.cidade,
        "observacoes":	dados.observacoes
      }

      if ((dados.despachante.id != -1) && (dados.despachante.id != null)) {
        params.despachante = {id: dados.despachante.id}
      }
      
      if ((dados.patio.id != -1) && (dados.patio.id != null)) {
        params.patio = {id: dados.patio.id}
      }

      if ((dados.guincheiro.id != -1) && (dados.guincheiro.id != null)) {
        params.guincheiro = {id: dados.guincheiro.id}
      }

      if ((dados.oficina.id != -1) && (dados.oficina.id != null)) {
        params.oficina = {id: dados.oficina.id}
      }

      if ((dados.seguradora.id != -1) && (dados.seguradora.id != null)) {
        params.seguradora = {id: dados.seguradora.id}
      }

      return http.put('/api/salvados/' + dados.guid, params).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message)
        } 
      
        return Promise.resolve(response.data);
      }, rejected => {
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
      return http.delete('/api/salvados/' + guid).then(function (response) {
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
      let url = '/api/salvados/'
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

        let listSalvados = resultArray.map(values => {
          let salv = this.Salvado();
          salv.id = values.id;
          salv.guid = values.guid;
          if ((values.dataCriacao !== undefined) && (values.dataCriacao !== null) && (values.dataCriacao !== ''))
            salv.dataCriacao = values.dataCriacao;
          
          if ((values.dataAtualizacao !== undefined) && (values.dataAtualizacao !== null) && (values.dataAtualizacao !== ''))
            salv.dataAtualizacao = values.dataAtualizacao;

          salv.sinistro = values.sinistro;
          salv.placa = values.placa;
          salv.modelo = values.modelo;
          salv.marca = values.marca;
          salv.cor = values.cor;
          salv.ano = values.ano;
          salv.valorFipe = values.valorFipe.toFixed(2).replace(".", ",");
          salv.apolice = values.apolice;
          salv.nomeSegurado  = values.nomeSegurado;
          salv.cidade = values.cidade;
          salv.observacoes = values.observacoes;
          salv.excluido = values.excluido;
          salv.despachante = despa.setDespachante(values.despachante);
          salv.patio = patio.setPatio(values.patio);
          salv.guincheiro = guin.setGuincheiro(values.guincheiro);
          salv.oficina = oficina.setOficina(values.oficina);
          salv.seguradora = seguradora.setSeguradora(values.seguradora)
          salv.usuario = acesso.setUsuario(values.usuario);
          salv.workflow = workflow.setWorkflow(values.workflow);
          salv.passoEtapa = etapaWorkflow.setEtapaWorkflow(values.passoEtapa);

          return salv;
        });

        listSalvados = listSalvados.filter(svl => svl.excluido === false) 
        return Promise.resolve(listSalvados);
      })
    } catch (err) {
      return Promise.reject(err)
    }
  },
  realizarAndamento(codigoEtapa, dados) {
    try {
      return this.listar({guid: dados.guidSalvado}).then(salv => {
        if (salv.length === 0)
          return Promise.reject('Processo não foi encontrado! GUID:'+ dados.guidSalvado)
        
        let oldSalv = salv[0]
        let newSalv = salv[0]

        switch (codigoEtapa) {
          case constantes._CODIGO_ETAPA_NOVO:
            if (!funcoes.isEquivalentObjects(dados, this.EtapaNovo())) {
              return Promise.reject('Input inválido')
            }
            newSalv.patio = {id: dados.patio.id}
            newSalv.oficina = {id: dados.oficina.id}
            break
          case constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_GUINCHEIRO:
            if (!funcoes.isEquivalentObjects(dados, this.EtapaAguardandoAtribGuincheiro())) {
              return Promise.reject('Input inválido')
            }
            newSalv.guincheiro = {id: dados.guincheiro.id}
            break
          case constantes._CODIGO_ETAPA_AGUARDANDO_GUINCHO:
            if (!funcoes.isEquivalentObjects(dados, this.EtapaAguardandoGuincho())) {
              return Promise.reject('Input inválido')
            }
            break
          case constantes._CODIGO_ETAPA_AGUARDANDO_ATRIB_DESPACHANTE:
            if (!funcoes.isEquivalentObjects(dados, this.EtapaAguardandoAtribDespachante())) {
              return Promise.reject('Input inválido')
            }
            newSalv.despachante = {id: dados.despachante.id}
            break
          case constantes._CODIGO_ETAPA_AGUARDANDO_DESPACHO:
            if (!funcoes.isEquivalentObjects(dados, this.EtapaAguardandoDespacho())) {
              return Promise.reject('Input inválido')
            }
            break
          case constantes._CODIGO_ETAPA_FINALIZADO:
            if (!funcoes.isEquivalentObjects(dados, this.EtapaFinalizado())) {
              return Promise.reject('Input inválido')
            }
            break
          default:
            break
        }
        this.validarEtapa(dados)

        return this.alterar(newSalv).then(salv => {
          return http.put('/api/salvados/'+ dados.guidSalvado +'/passos',
          {
            "observacao": dados.observacao,
            "idUsuario": dados.idUsuario,
            "idPasso": dados.idPassoDestino
          }).then(function (response) {
            if (response.status != 200) {
              return Promise.reject(response.data.message)
            } 
          
            return Promise.resolve(response.data);
          },
          rejected => {
            if (rejected.response && (rejected.response.data !== undefined)) {
              if (funcoes.propsQuantity(rejected.response.data) > 0) {
                return Promise.reject((rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()]))
              }
            } else
            return Promise.reject(rejected.message.toString())
          });
        },
        rejected => {
          if (rejected.response && (rejected.response.data !== undefined)) {
            if (funcoes.propsQuantity(rejected.response.data) > 0) {
              return Promise.reject((rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()]))
            }
          } else
            return Promise.reject(rejected.message.toString())
        })
      },
      rejected => {
        if (rejected.response && (rejected.response.data !== undefined)) {
          if (funcoes.propsQuantity(rejected.response.data) > 0) {
            return Promise.reject(rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()])
          }
        } else
          return Promise.reject(rejected.message.toString())
      })
    } catch (err) {
      return Promise.reject(err)
    }
  },
  getHistorico(dados) {
    try {
      return this.listar({guid: dados.guid}).then(salv => {
        if (salv.length === 0)
          return Promise.reject('Processo não foi encontrado! GUID:'+ dados.guid)

        return http.get('/api/salvados/'+ dados.guid +'/historico',{}).then(
        response => {
          if (response.status != 200) {
            return Promise.reject(response.data.message)
          } 
        
          return Promise.resolve(response.data.data);
        },
        rejected => {
          if (rejected.response && (rejected.response.data !== undefined)) {
            if (funcoes.propsQuantity(rejected.response.data) > 0) {
              return Promise.reject((rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()]))
            }
          } else
            return Promise.reject(rejected.message.toString())
        });
      },
      rejected => {
        if (rejected.response && (rejected.response.data !== undefined)) {
          if (funcoes.propsQuantity(rejected.response.data) > 0) {
            return Promise.reject(rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()])
          }
        } else
          return Promise.reject(rejected.message.toString())
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
export default salvado