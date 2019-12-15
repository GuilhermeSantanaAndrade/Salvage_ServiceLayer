import chai, { expect } from 'chai' 
import sinonChai  from 'sinon-chai' 
import moxios from 'moxios'

chai.use(sinonChai)

//#####################################

import acesso from '../../src/service/acessoService'   

describe('AcessoService', function () {
  beforeEach(function () {
    moxios.install()
  }) 
  afterEach(function () {
    moxios.uninstall()
  }) 
  describe('Smoke Tests', function () {
    it('deveria existir a funcao acesso()', function(  ) {
      expect(acesso).to.exist
    })
    it('deveria existir a funcao login', ()=>{
      expect(acesso.login).to.be.exist
    })  
    it('deve existir o metodo esqueceuSenha', function ( ){
      expect(acesso.esqueceuSenha).to.exist 
    })
    it('deveria existir o metodo alterarSenha', function(  ) {
      expect(acesso.alterarSenha).to.exist
    }) 
  })
  describe('Login', function () { 
    it('deveria chamar o metodo login com usuario e senha corretos', function ( done ) {
      moxios.stubRequest('acesso/login', {
        status: 200,
        headers: {
          authorization: '9DzxDS43rfS#r5rerg'
        }
      })
      
      acesso.login('thiago@teste.com.br', '1Senha').then( ({data, status, headers})  => {
        expect(status).to.be.equal(200)
        expect(headers.authorization).to.be.equal('9DzxDS43rfS#r5rerg')
        done()
  
      })
      .catch(err => { console.log(err); done(); })
      
    })    
    it('deveria informar tentativa inválida de email ou senha em branco', ( done ) => {
      let response = acesso.login('', '') 
      expect(response).to.be.equal('Você deve preencher o e-mail ou a senha corretamente')
      done()
    }) 
  })
  describe('Esqueci Senha', function () {
    it('deveria ser um e-mail válido', function () {
      let email = 'thiago@t@este.com.br'
      let response = acesso.esqueceuSenha(email)
      expect(response).to.be.equal('Você deve informar um e-mail válido')
    })
    it('deveria chamar post se e-mail for válido', function (done){ 
      let email = 'thiago@teste.com.br'


      moxios.stubRequest('acesso/esqueceusenha', {
        status: 200,
        response: {
          mensagem: 'Enviamos um e-mail com um link para você resetar sua senha'
        },
        headers: {
          authorization: null
        }
      })


      acesso.esqueceuSenha(email).then( ({data, status, headers})  => {  
        expect(data.mensagem).to.be
         .equal('Enviamos um e-mail com um link para você resetar sua senha')
        expect(status).to.be.equal(200)     
        expect(headers.authorization).to.be.equal(null)   
        done()        
      })
      .catch(err => { console.log(err); done(); })
    })
  })
  describe('Alterar Senha', function () {
    it('deveria alterar senha com link-token mais a confirmacao de senha', function (done) {
      let token = 'foo'
      let senha = 'senha1'
      let confirmacao = 'senha1'

      moxios.stubRequest('acesso/alterarsenha', {
        status: 200,
        response: {
          mensagem: 'Senha alterada com sucesso'
        },
        headers: {
          authorization: null
        }
      })


      let response = acesso.alterarSenha(token, senha, confirmacao)
      response
      .then(({data, status}) => {
        expect(status).to.be.equal(200)
        expect(data.mensagem).to.be.equal('Senha alterada com sucesso')
        done()
      })
      .catch(err => { console.log(err); done(); })
    })
    it('deveria ter token diferente de branco', function () {
      let token = ''      
      let response = acesso.alterarSenha(token)
      
      expect(response).to.be.equal('Não existe um token de validação ou ele expirou')
    })
    it('deveria informar erro se senha e confirmacao forem diferentes', function () {
       let senha = 'senha1'
       let confirmacao = 'senha13'
       let token = 'foo'

       let response = acesso.alterarSenha(token, senha, confirmacao)
       expect(response).to.be.equal('As senhas devem ser iguais')
    }) 
  }) 
}) 