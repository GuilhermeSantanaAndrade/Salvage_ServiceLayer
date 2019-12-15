import http from '../axios/http'

const contato = {
  Contato() {
    let Contato = {
      guid : '',
      nome : '',
      celular : '',
      email : '',
      dataCriacao : new Date(),
      dataAtualizacao : new Date()
    }
    return Contato
  },
  setDefaults(dados) {

  },  
  validar(dados, isAlteracao = false) {
    if (isAlteracao && dados.guid && (dados.guid.toString().trim() === '')) {
      throw Error('GUID não foi preenchido');
    }
    
    if (dados.nome && (dados.nome.toString().trim() === '')) {
        throw Error('NOME não foi preenchido');
    }
  }
}

export default contato