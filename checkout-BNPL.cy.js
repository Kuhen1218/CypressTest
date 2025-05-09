

//Able to redirect to "Instalment options" page

describe("(Pay in Full) - BNPL-Islamic", () => {
  it("Complete BNPL payment", () => {
    cy.visit("https://dev-pay-refactor.mobycheckout.com/l/o58PLKL4GK")
    cy.get('input#flexiAmount').type('100.00')
    cy.get('input#customerMobileField').type('0112233445')
    cy.get('input#customerNameField').type('Kuhenraj Manimaran')
    cy.get('input#customerEmailField').type('kuhentest3@mobypay.my')
    cy.get('[data-pixel-event-name="click_moby_islamic"]').click()
    cy.get('#proceedBtn').click()


    //BNPL Continue in browser tab
    cy.origin('https://dev.external-web.moby.my/invoice-number/AP-APM-1661392972-GQB4-1736127194103/payment', () => { //this one is for when you wanna go from one link to another link. 
      cy.get("label[for='tab2']", { timeout: 40000 }).should('be.visible').click()
      cy.get('input#customer_mobile').type('112233445')
      cy.get('#customer_login').click();


      //cy.get('input#first_otp').type('2', { timeout: 40000 }).should('be.visible').type('1');

      cy.get('input#first_otp').type('1', { timeout: 40000 }).should('be.visible').wait(500).type('1'); // Wait for half a second to stabilize
      cy.get('input#second_otp').type('2', { timeout: 40000 }).should('be.visible').type('2')
      cy.get('input#third_otp').type('3', { timeout: 40000 }).should('be.visible').type('3')
      cy.get('input#fourth_otp').type('4', { timeout: 40000 }).should('be.visible').type('4')
      cy.get('#check_login_btn').click({ force: true })

      cy.get('#consentCheckbox', { timeout: 40000 }).should('be.visible').check() // Wait up to 40 seconds
      cy.get('#pay_now').click()

    })
  })


  it("Click 'Back to Merchant > send receipt via email", () => {

    cy.visit("https://dev.external-web.moby.my/payment/status-redirect-page?bill_code=AP-APM-1730144256871-UPO2-1744172012993")
    cy.get('.primary-button').click({ force: true });
    cy.get('.px-3').type('kuhentest3@mobypay.my')

    cy.get('button[type="submit"]').click()

  })

  afterEach(() => {
    // Clear cookies and session storage after each test to avoid cross-test issues
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  //download receipt

  it("Complete BNPL payment", () => {
    cy.visit("https://dev-pay-refactor.mobycheckout.com/l/o58PLKL4GK")
    cy.get('input#flexiAmount').type('100.00')
    cy.get('input#customerMobileField').type('0112233445')
    cy.get('input#customerNameField').type('Kuhenraj Manimaran')
    cy.get('input#customerEmailField').type('kuhentest3@mobypay.my')
    cy.get('[data-pixel-event-name="click_moby_islamic"]').click()
    cy.get('#proceedBtn').click()

    //Continue in browser tab
    cy.origin('https://dev.external-web.moby.my/invoice-number/AP-APM-1661392972-REVT-1736317488959/payment', () => { //this one is for when you wanna go from one link to another link. 
      cy.get("label[for='tab2']", { timeout: 40000 }).should('be.visible').click()
      cy.get('input#customer_mobile').type('112233445')
      cy.get('#customer_login').click();

      cy.get('input#first_otp').type('1', { timeout: 40000 }).should('be.visible').wait(500).type('1') // Wait for half a second to stabilize
      cy.get('input#second_otp').type('2', { timeout: 40000 }).should('be.visible').type('2')
      cy.get('input#third_otp').type('3', { timeout: 40000 }).should('be.visible').type('3')
      cy.get('input#fourth_otp').type('4', { timeout: 40000 }).should('be.visible').type('4')
      cy.get('#check_login_btn').click()
      cy.get('#consentCheckbox', { timeout: 40000 }).should('be.visible').check()
      cy.get('#pay_now').click({ timeout: 40000 })


      cy.get('.primary-button', { timeout: 60000 }).should('not.exist');
      cy.get('#downloadReceipt').click({ force: true });




    })
  })


  it(" Wait until time limit > Download receipt", () => {
    cy.visit("https://dev.external-web.moby.my/payment/status-redirect-page?bill_code=AP-APM-1661392972-REVT-1736317488959")

    // Wait for the timer button to disappear (means countdown is done)
    cy.get('.primary-button', { timeout: 60000 }).should('not.exist');

    // Then wait for #downloadReceipt to appear
    cy.get('#downloadReceipt', { timeout: 10000 })
      .should('be.visible')
      .click();
  })
})


afterEach(() => {
  // Clear cookies and session storage after each test to avoid cross-test issues
  cy.clearCookies();
  cy.clearLocalStorage();
});


//Cancel payment 

describe("(Pay in Full) - BNPL-Islamic - Cancel Payment", () => {
  it("Cancel BNPL payment", () => {
    cy.visit("https://dev.pay.mobycheckout.com/v2/l/MBqqdbTFFx")
    cy.get('input#flexiAmount').type('100.00')
    cy.get('input#customerMobileField').type('0112233445')
    cy.get('input#customerNameField').type('Kuhenraj Manimaran')
    cy.get('input#customerEmailField').type('kuhentest3@mobypay.my')
    cy.get('[data-pixel-event-name="click_moby_islamic"]').click()
    cy.get('#proceedBtn').click()


    //Continue in browser tab

    //click "back to merchant"

    cy.origin('https://dev.external-web.moby.my/payment/status-redirect-page?bill_code=AP-APM-1661392972-REVT-1736317488959', () => { //this one is for when you wanna go from one link to another link. 
      cy.get("label[for='tab2']", { timeout: 40000 }).should('be.visible').click()
      cy.get('input#customer_mobile').type('102786321')
      cy.get('#customer_login').click();

      cy.get('input#first_otp').type('1', { timeout: 40000 }).should('be.visible').wait(500).type('1'); // Wait for half a second to stabilize
      cy.get('input#second_otp').type('2', { timeout: 40000 }).should('be.visible').type('2')
      cy.get('input#third_otp').type('3', { timeout: 40000 }).should('be.visible').type('3')
      cy.get('input#fourth_otp').type('4', { timeout: 40000 }).should('be.visible').type('4')
      cy.get('#check_login_btn').click({ force: true })

      cy.get('#consentCheckbox', { timeout: 40000 }).should('be.visible').check()

      cy.get('#cancel')
        .click()

      cy.get('.swal2-deny')  // Ensure the cancel button is visible
        .click() // Click "No"

      cy.get('#cancel')
        .click()

      cy.get('.swal2-confirm')
        .click({ timeout: 40000 }) // Click "Yes"

    })
  })


  it(" Click 'Back to Merchant'", () => {
    cy.visit("https://dev.external-web.moby.my/payment/status-redirect-page?bill_code=AP-APM-1661392972-8YML-1736301564450")
    cy.get('.primary-button').click({ force: true });

  })



  afterEach(() => {
    // Clear cookies and session storage after each test to avoid cross-test issues
    cy.clearCookies();
    cy.clearLocalStorage();
  });


  //wait until timer over


  it("Cancel BNPL payment", () => {
    cy.visit("https://dev.pay.mobycheckout.com/v2/l/MBqqdbTFFx")
    cy.contains('MYR 100.00')
    cy.get('input#customerMobileField').type('0102786321')
    cy.get('input#customerNameField').type('Kuhenraj Manimaran')
    cy.get('input#customerEmailField').type('kuhenT3@gmail.com')
    cy.get('[data-pixel-event-name="click_moby_islamic"]').click()
    cy.get('#proceedBtn').click()

    //Continue in browser tab
    //Click "back to merchant"

    cy.origin('https://dev.external-web.moby.my/invoice-number/AP-APM-1661392972-8YML-1736301564450/payment', () => { //this one is for when you wanna go from one link to another link. 
      cy.get("label[for='tab2']", { timeout: 40000 }).should('be.visible').click()
      cy.get('input#customer_mobile').type('102786321')
      cy.get('#customer_login').click({ timeout: 40000 });

      cy.get('input#first_otp').type('1', { timeout: 40000 }).should('be.visible').wait(500).type('1');   // Wait for half a second to stabilize
      cy.get('input#second_otp').type('2', { timeout: 40000 }).should('be.visible').type('2')
      cy.get('input#third_otp').type('3', { timeout: 40000 }).should('be.visible').type('3')
      cy.get('input#fourth_otp').type('4', { timeout: 40000 }).should('be.visible').type('4')
      cy.get('#check_login_btn').click({ force: true })

      cy.get('#consentCheckbox', { timeout: 40000 }).should('be.visible').check()

      cy.get('#cancel')
        .click()

      cy.get('.swal2-deny')  // Ensure the cancel button is visible
        .click() // Click "No"

      cy.get('#cancel')
        .click()

      cy.get('.swal2-confirm')
        .click({ timeout: 40000 }) // Click "Yes"


    })
  })

  it(" Wait until it redirect to Checkout Fail page'", () => {
    cy.visit("https://dev.external-web.moby.my/payment/status-redirect-page?bill_code=AP-APM-1661392972-8YML-1736301564450")
    cy.get('.primary-button', { timeout: 40000 })
      .should('be.visible')
      .click

    cy.get('#tryAgainBtn', { timeout: 40000 }) // Wait up to 40 seconds
      .should('be.visible') // Ensure it's visible
      .click();

    cy.get('[data-pixel-event-name="click_moby_islamic"]').click()
    cy.get('#proceedBtn').click()

  })

  // make successful payment after failed bill

  it("Make successful payment", () => {

    cy.visit("https://dev.external-web.moby.my/invoice-number/AP-APM-1661392972-9IVN-1736301635802/payment")

    cy.get("label[for='tab2']", { timeout: 40000 }).should('be.visible').click()
    cy.get('input#customer_mobile').type('102786321')
    cy.get('#customer_login').click();

    cy.get('input#first_otp', { timeout: 40000 }).should('be.visible').wait(500).type('1');  // Wait for half a second to stabilize
    cy.get('input#second_otp', { timeout: 40000 }).should('be.visible').type('2')
    cy.get('input#third_otp', { timeout: 40000 }).should('be.visible').type('3')
    cy.get('input#fourth_otp', { timeout: 40000 }).should('be.visible').type('4')
    cy.get('#check_login_btn').click({ force: true })
      .should('be.visible')
      .click

    cy.get('.primary-button', { timeout: 40000 })
      .should('be.visible')
      .click

    cy.get('.px-3', { timeout: 50000 })
      .should('be.visible')
      .type('kuhenT2@gmail.com');

    cy.get('button[type="submit"]').click()

  })

})
