import http from '../axios/http'
import funcoes from './funcoes'
import acesso from './acessoService'
import end from './enderecoService'
import contato from './contatoService'
import etapaWorkflow from './etapaWorkflowService'

const month = new Array();
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

const relatorio = {
  // Classe relatorio
  Relatorio() {
    let Relatorio = {
      
    }
    return Relatorio
  },
  anualFinalizados(dados) {
    try {
      return etapaWorkflow.getEtapaWorkflow({}).then(etapas => {
        if (etapas.length == 0)
          return Promise.resolve({"meses": [], "valores": []})
        let etapaFinal = etapas[etapas.length - 1].id;

        dados.guid = '34443981-8681-42f8-9276-f400c3f2282a'
        return http.get('/api/seguradoras/'+ dados.guid +'/relatorios/salvados/passos/'+ etapaFinal.toString() +'/dia/criacao', {}).then(function (response) {
          if (response.status != 200) {
            throw Error(response.data.message)
          }
          let dias = response.data.data;
          let result = [];
          let idx = -1;
          dias.map(dia => {
            idx = result.findIndex((element, i, arr) => {return element.mes === dia.mesAno.substring(3, 5)})
            if (idx > -1)
              result[idx].quantidade = result[idx].quantidade + dia.quantidade
            else
              result.push({ano: dia.mesAno.substring(6, 10), mes: dia.mesAno.substring(3, 5), quantidade: dia.quantidade})              
          })

          let meses = [];
          let meses_processed = []
          let valores = [];
          let mes = ''

          result.map(result => {
            meses.push(result.mes + '/' + result.ano)
            valores.push(result.quantidade)
          })
          meses = meses.sort()
          valores = valores.sort()
          meses.map(result2 => {
            let i = Number(result2.substring(0, 2))
            mes = month[i-1]
            meses_processed.push(mes + '/' + result2.substring(5, 8))
          })

          return Promise.resolve({"meses": meses_processed, "valores": valores});
        },
        rejected => {
          if (rejected.response && (rejected.response.data !== undefined)) {
            if (funcoes.propsQuantity(rejected.response.data) > 0) {
              throw Error(rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()])
            }
          } else
            throw Error(rejected.message.toString())
        });
      })
    } catch (err) {
      return Promise.reject(err)
    }
  },
  anualAbertos(dados) {
    try {
      dados.guid = '34443981-8681-42f8-9276-f400c3f2282a'
      return http.get('/api/seguradoras/'+ dados.guid +'/relatorios/salvados/mes/criacao', {}).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message)
        }
        let dias = response.data.data;
        let result = [];
        let idx = -1;
        dias.map(dia => {
          idx = result.findIndex((element, i, arr) => {return element.mes === dia.mesAno.substring(0, 2)})
          if (idx > -1)
            result[idx].quantidade = result[idx].quantidade + dia.quantidade
          else
            result.push({ano: dia.mesAno.substring(3, 7), mes: dia.mesAno.substring(0, 2), quantidade: dia.quantidade})              
        })

        let meses = [];
        let meses_processed = []
        let valores = [];
        let mes = ''

        result.map(result => {
          meses.push(result.mes + '/' + result.ano)
          valores.push(result.quantidade)
        })
        meses = meses.sort()
        valores = valores.sort()
        meses.map(result2 => {
          let i = Number(result2.substring(0, 2))
          mes = month[i-1]
          meses_processed.push(mes + '/' + result2.substring(5, 8))
        })

        return Promise.resolve({"meses": meses_processed, "valores": valores});
      })
    } catch (err) {
      return Promise.reject(err)
    }
  },
  etapasQuantidades(dados) {
    try {
      return etapaWorkflow.getEtapaWorkflow({}).then(etapas => {
        if (etapas.length == 0)
          return Promise.resolve([])
        
        etapas = etapas.map(etp => {
          return {descricao: etp.descricao, quantidade: 0}
        })

        dados.guid = '34443981-8681-42f8-9276-f400c3f2282a'
        return http.get('/api/seguradoras/'+ dados.guid +'/relatorios/salvados/passos', {}).then(function (response) {
          if (response.status != 200) {
            throw Error(response.data.message)
          }
          let result = response.data.data;
          let idx = -1;
          etapas.map(etp => {
            idx = result.findIndex((element, i, arr) => {return element.descricao === etp.descricao})
            if (idx > -1)
              etp.quantidade = etp.quantidade + result[idx].quantidade
            return etp
          })

          return Promise.resolve(etapas);
        },
        rejected => {
          if (rejected.response && (rejected.response.data !== undefined)) {
            if (funcoes.propsQuantity(rejected.response.data) > 0) {
              throw Error(rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()])
            }
          } else
            throw Error(rejected.message.toString())
        });        
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
export default relatorio