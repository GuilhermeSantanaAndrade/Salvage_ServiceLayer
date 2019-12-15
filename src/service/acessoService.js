import http from '../axios/http'
import funcoes from './funcoes'

const acesso = {
  // Classe usuario
  Usuario() {          
    let Usuario = {
      id: -1,
      guid: '',
      login: '',
      senha: '',
      administrador: false,
      empresaPertencente: {},
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      token: ''
    }
    return Usuario
  },
  setUsuario(data) {
    let aux = this.Usuario();
    //usr.nome = nome;
    aux.id = data.id;
    aux.guid = data.guid;
    aux.login = data.login;
    aux.senha = data.senha;
    aux.administrador = data.administrador;
    aux.empresaPertencente = data.empresaPertencente;
    if ((data.dataCriacao !== undefined) && (data.dataCriacao !== null) && (data.dataCriacao !== ''))          
      aux.dataCriacao = data.dataCriacao;
      
    if ((data.dataAtualizacao !== undefined) && (data.dataAtualizacao !== null) && (data.dataAtualizacao !== ''))
      aux.dataAtualizacao = data.dataAtualizacao;

    //if (data.token)
    //  usr.token = data.token;
    return aux;
  },
  login (email, senha) {
    try {
      if (email !== 'push')
        funcoes.validaEmail(email)
      funcoes.validaSenha(senha, false)

      return http.post('/api/Usuarios/acesso/', 
      { login: email, senha: senha }).then(response => {
        if (response.status != 200) {
          throw Error(response.data.mensagens)
        }
        
        if (response.data.data == null)
          throw Error(response.data.mensagens)        
      
        let usr = this.setUsuario(response.data.data);
        return Promise.resolve(usr);
      },
      rejected => {
        if (rejected.response && (rejected.response.data !== undefined)) {
          if (funcoes.hasProp(rejected.response.data, 'mensagens')) {
            throw Error(rejected.response.data['mensagens'])
          } else
          if (funcoes.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[funcoes.getPropByIndex(rejected.response.data, 0).toString()])
          }
        } else
          throw Error(rejected.message.toString())
      })
    } catch (err) {
      return Promise.reject(err)
    }    
  },
  esqueceuSenha (email) {
    try {
      funcoes.validaEmail(email)

      return http.post('http://www.mocky.io/v2/5c5791422f00007509856a50', 
      { email: email  }).then(response => {
        if (response.status != 200) {
          throw Error(response.data.message)
        }
        
        return Promise.resolve(response.data);
      })
    } catch (err) {
      return Promise.reject(err)
    }  
  },
  alterarSenha (token, senha, confirmacao) {
    try {  
      if (token == '') 
        throw Error('Não existe um token de validação ou ele expirou')
        
      if (senha != confirmacao) 
        throw Error('As senhas devem ser iguais')

      return http.post('http://www.mocky.io/v2/5c48ea6b32000055000b5659', 
      { token: token, senha: senha, confirmacao: confirmacao }).then(response => {
        if (response.status != 200) {
          throw Error(response.data.message)
        }  
      
        return Promise.resolve(response.data);
      })    
    } catch (err) {
      return Promise.reject(err)
    }  
  },
  validar(usuario, isAlteracao = false){

  },
  incluir(usuario) {

  },
  alterar() {
    
  }
}

export default acesso 
