import chai, { expect } from 'chai' 
import sinonChai  from 'sinon-chai' 
import moxios from 'moxios'

chai.use(sinonChai)

//#####################################

import { acesso, guincheiro } from '../src/app'  

describe('App.js', function () {
  describe('Smoke Tests', function () {
    it('deveria existir o objeto acesso exportado em app', function () {
      expect(acesso).to.exist
    })
    it('deveria existir o objeto guincheiro exportado em app', function () {
      expect(guincheiro).to.exist
    })
  })
})
