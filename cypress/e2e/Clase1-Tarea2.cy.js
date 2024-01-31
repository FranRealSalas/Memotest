const URL = 'http://localhost:5500/Clase%206/Tarea2/tarea2.html';

context('Clase 6 Tarea 2', ()=>{

  beforeEach(()=>{
    cy.visit(URL);
  });

  describe('Revision del formulario', ()=>{
    it('Se asegura que exista un titulo',()=>{
      cy.get('h1').contains('Calculadora de salarios');
    });

    it('Se asegura que existan botones',()=>{
      cy.get('#botones-div').find('.boton').should('have.length',2);
    });

    it('Se asegura que los botones tengan la informacion correcta',()=>{
      cy.get('#agregar').contains('Agregar');
      cy.get('#quitar').contains('Quitar');
    });
  });

  describe('Completa el formulario',()=>{
    it('Quitar integrante',()=>{
      cy.get('#quitar').click();
      cy.get('#errores').contains('No hay elementos para quitar');
    });

    it('Agregar y quitar integrante',()=>{
      cy.get('#agregar').click();
      cy.get('#quitar').click();
    });

    it('Completar con errores',()=>{
      cy.get('#agregar').click();
      cy.get('#agregar').click();
      cy.get('.salarios-input').first().type(-10);
      cy.get('.salarios-input').last().type(10);
      cy.get('#calcular').click();
      cy.get('#errores').contains('El salario ingresado (-10) del integrante 1 es erroneo. Debe ingresar un salario valido, solo se permiten numeros positivos')
      cy.get('#errores').should('be.visible')
    });

    it('Completar formulario',()=>{
      cy.get('#agregar').click();
      cy.get('#agregar').click();
      cy.get('.salarios-input').first().type(10);
      cy.get('.salarios-input').last().type(10);
      cy.get('#calcular').click();
      cy.get('#errores').should('be.empty');
      cy.get('#errores').should('not.be.visible');
      cy.get('#resultados-calcular').should('be.visible');
    });
  });
});