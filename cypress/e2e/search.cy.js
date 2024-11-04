describe('Land Search Process', () => {
    it('page successfully loads', () => {
        //Visit Ardhisasa Platform open login page
        cy.visit('/home')
        cy.contains('Ardhisasa')
        cy.contains('Ardhisasa is an online platform that allows Citizens, stakeholders and interested parties')
        cy.xpath("//a[@routerlink='/account']").should('be.visible').click();
        cy.contains('Login')

        //Enter login credentials and verify user
        cy.xpath("(//div[@class='mat-form-field-infix'])[1]").type("PA0G09FA0B")
        cy.xpath("(//div[@class='mat-form-field-infix'])[2]").type('Test@123')

        cy.xpath("//button[@type='submit']").should('be.visible').click();
        cy.xpath("//button[@id='verify']").should('be.visible').click();
    })
})