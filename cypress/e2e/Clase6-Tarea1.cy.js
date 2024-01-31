const URL = 'http://localhost:5500/Clase%206/Tarea1/clase6-tarea1.html';

context('Clase 6 Tarea 1', ()=>{
  
  beforeEach(()=>{
    cy.visit(URL);
  });

  describe('Revision del formulario', ()=>{
    it('Se asegura que haya un input para ingresar cantidad',()=>{
      cy.get('#cantidad-integrantes').should('be.empty');
    });
    
    it('Se asegura que haya botones', ()=>{
      const cantidadBotones = 3;
      cy.get('#botones').find('.boton').should('have.length',cantidadBotones);
    });

    it('Se asegura que los botones tengan la informacion correcta',()=>{
      cy.get('#calcular').contains('Calcular');
      cy.get('#boton-siguiente').contains('Siguiente');
      cy.get('#boton-reset').contains('Reiniciar');
    });

    it('Se asegura que no esten visibles los resultados del formulario', ()=>{
      cy.get('#resultados-calculo').should('not.be.visible');
    });
  });

  describe('Completa el formulario', ()=>{
    it('Error en cantidad de integrantes', ()=>{
      cy.get('#cantidad-integrantes').click();
      cy.get('#cantidad-integrantes').type(-2);
      cy.get('#boton-siguiente').click();
      cy.get('#resultados-calculo').should('not.be.visible');
      cy.get('#errores').should('be.visible');
    });


    it('Error en Edades', ()=>{
      cy.get('#cantidad-integrantes').click();
      cy.get('#cantidad-integrantes').type(2);
      cy.get('#boton-siguiente').click();
      cy.get('.integrantes').find('input').first().type(-10);
      cy.get('.integrantes').find('input').last().type(12);
      cy.get('#calcular').click();
      cy.get('#resultados-calculo').should('not.be.visible');
      cy.get('#errores').should('be.visible');
    });

    it('Completa el formulario', ()=>{
      cy.get('#cantidad-integrantes').click();
      cy.get('#cantidad-integrantes').type(2);
      cy.get('#boton-siguiente').click();
      cy.get('.integrantes').find('input').first().type(10);
      cy.get('.integrantes').find('input').last().type(12);
      cy.get('#calcular').click();
      cy.get('#resultados-calculo').should('be.visible');
      cy.get('#errores').should('not.be.visible');
    });
  });
});