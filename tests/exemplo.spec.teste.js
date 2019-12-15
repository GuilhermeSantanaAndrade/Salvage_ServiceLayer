//--bail no console para parar no primeiro teste com erro

describe('Exemplo.js', () => {
  var expect = require('chai').expect;
  var arr;

  describe('Testando array', ()=>{
    beforeEach(()=>{ 
      arr = [1, 2, 3] 
    })
    context('manipulando o array', () => {
      it('deveria ter valor 4 quando dar um valor no push do array', () => {
        arr.push(4)
        expect(arr).to.have.lengthOf(4)
      })
      it('deveria remover o valor 3 quando usar funcao pop', () => {
        arr.pop()
        expect(arr).to.not.include(3)
      })
      it('deveria ter length 2 depois de dar um pop', ()=> {
        arr.pop()
        expect(arr).to.have.lengthOf(2)
      })
    })
  })



  describe('Metodo exemplo', () => {
    before(()=>{
      //roda uma vez antes do bloco
      //console.log('before')
    })
    after(()=>{
      //roda uma vez depois do bloco 
      //console.log('after')
    })
    beforeEach(()=>{
      //roda todas as vezes antes de cada bloco  
      //console.log('beforeeach')
    })
    afterEach(()=>{
      //roda todas as vezes depois de cada bloco 
      //console.log('aftereach')
    }) 
    context('caso 1', () => {
      it('deveria acontecer tal coisa e retornar valor 4', () => {
        //espera o que aconteça
        //entrada de dados/metodos metodo soma (2,2)
        //espera retornar (4) => true | (3) => false <- quebra o teste
      })
    })
    context('caso 2', () => {
      it('nao deveria acontecer tal coisa e retornar false', () => {

      })
    })
  })
});