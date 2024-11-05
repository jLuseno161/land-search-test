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
        cy.get('button#verify').should('exist').click();

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
        cy.url().should('include', '/user/MoLPP/registration/search/new-application');
        cy.get('#cdk-step-label-0-1').should('contain', 'Search details').click()

        cy.get('input[formcontrolname="parcel_number"]').type("NAIROBI/BLOCK153/126")
        cy.get('#add_parcel').click()
        // cy.get('input[formcontrolname="parcel_number"]').type("NAIROBI/BLOCK153/131")
        // cy.get('#add_parcel').click()

        cy.get('textarea[formcontrolname="purpose_of_search"]').type("Verify Land owner")

        cy.get("div[class='row_section'] button[type='submit']").should('contain', 'Next').click()

        //Attach documents
        cy.readFile('cypress/fixtures/File Test.pdf').should('exist');

        cy.get('input[type="file"]').eq(0).attachFile('File Test.pdf');
        cy.get('input[type="file"]').eq(1).attachFile('File Test2.pdf');

        cy.xpath("//div[@id='cdk-step-content-0-2']//button[@type='submit']").should('contain', 'Next').click()

        //Submit application
        cy.get('button#submit_request').click()
        cy.get('#mat-dialog-0')
            .should('exist')
            .and('contain', 'Are you sure you want to submit the request!')
        cy.xpath("//button[@class='continue-button mat-button mat-button-base']").should('contain.text', 'Yes').click()

        // cy.xpath("//div[@role='dialog']")
        //     .should('be.visible', { timeout: 4000 })
        //     .invoke('text')
        //     .should('include', 'Application successfully submitted!');

        cy.xpath("//div[@role='dialog']")
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.include('Application successfully submitted!');
            });

        cy.xpath("//button[normalize-space()='Close']").should('be.visible').click()

        cy.url().should('include', '/search-application/Pending/')

    });
})