import chai, { expect } from 'chai' 
import sinonChai  from 'sinon-chai' 
import moxios from 'moxios'

chai.use(sinonChai)

//#####################################

import guincheiro from '../../src/service/guincheiroService'  

describe('GuincheiroService', function () {
  beforeEach(function () {
    moxios.install()
  }) 
  afterEach(function () {
    moxios.uninstall()
  }) 

  describe('Smoke Tests', function () {
    it('deveria existir o objeto guincheiro', function () {
      expect(guincheiro).to.exist
    })
    it('deveria existir o metodo de incluir guincheiro', function () {
      expect(guincheiro.incluir).to.be.exist
    })
    it('deveria existir o metodo de atualizar guincheiro', function () {
      expect(guincheiro.alterar).to.be.exist
    })
    it('deveria existir o metodo de deletar guincheiro', function () {
      expect(guincheiro.deletar).to.be.exist
    })
    it('deveria existir o metodo de listar guincheiros', function () {
      expect(guincheiro.listar).to.be.exist
    })
  })
})