import chai, { expect } from 'chai' 
import sinonChai  from 'sinon-chai' 
import moxios from 'moxios'

chai.use(sinonChai)

//#####################################

import despachante from '../../src/service/despachanteService'  

describe('DespachanteService', function () {
  beforeEach(function () {
    moxios.install()
  }) 
  afterEach(function () {
    moxios.uninstall()
  }) 
  describe('Smoke Tests', function () {
    it('deveria existir o objeto despachante', function(  ) {
      expect(despachante).to.be.exist
    })
    it('deveria existir a funcao incluir', ()=>{
      expect(despachante.incluir).to.be.exist
    })   
  })
  describe('Incluir', function () {
    it('deveria executar o metodo incluir', function (done) {

      moxios.stubRequest('/despachante', {
        status: 201, //status code 201=created
      })


      let response = despachante.incluir()
      response
      .then(({data, status}) => {
        expect(status).to.be.equal(201) 
        done()
      })
      .catch(err => { console.log(err); done(); })

    }) 
  })
})