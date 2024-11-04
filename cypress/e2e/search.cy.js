describe('Land Search Process', () => {
    before(() => {
        // Visit Ardhisasa Platform open login page
        cy.visit('/home')
        cy.contains('Ardhisasa')
        cy.xpath("//a[@routerlink='/account']").should('be.visible').click();
        cy.contains('Login')

        //Enter login credentials and verify user
        cy.get('input[formcontrolname="username"]').type("PA0G09FA0B")
        cy.get('input[formcontrolname="password"]').type('Test@123')

        cy.xpath("//button[@type='submit']").should('be.visible').click();
        cy.get('button#verify').should('be.visible').click();

        //load user profile
        cy.intercept('http://192.168.214.184/acl/api/v1/accounts/userprofiledetails').as('getProfilePhoto');
        cy.wait('@getProfilePhoto');

        cy.get('.greetings').should('contain', 'Hi Monicah, welcome');
    });
})