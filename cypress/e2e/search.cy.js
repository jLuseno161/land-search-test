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

    it('navigate to search in Land Registration section', () => {

        //Navigate to Land Registration Section
        cy.contains('Land Registration').should('be.visible').click();
        cy.get(".service_link[routerlink='/user/MoLPP/registration/search/search-application']").click();

          //Initiate Search Application and fill in search data
          cy.contains('Search Applications')
          cy.get('.new_application_btn.mat-button.mat-button-base').should('contain', 'New Application').click()
  
          cy.contains('Search: New Application')
          cy.get('#cdk-step-label-0-1').should('contain', 'Search details').click()
  
          cy.get('input[formcontrolname="parcel_number"]').type("NAIROBI/BLOCK153/126")
          cy.get('#add_parcel').click()
          cy.get('input[formcontrolname="parcel_number"]').type("NAIROBI/BLOCK153/131")
          cy.get('#add_parcel').click()
  
          cy.get('textarea[formcontrolname="purpose_of_search"]').type("Verify Land owner")
  
          cy.get("div[class='row_section'] button[type='submit']").should('contain', 'Next').click()
  
    });
})