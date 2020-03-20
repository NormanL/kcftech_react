describe("Corporations", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("should display a list of corporations", () => {
        cy.findByText("Corporations");
    });

    it.only("should add a corporation when the add corporation form is submitted and then deleted", () => {
        cy.findByLabelText("Name").type("Test corp");
        cy.findByLabelText("Icon").type("Test icon");
        cy.findByText("Add Corporation").click();
        // Now assure form cleared
        cy.findByLabelText("Name").should("have.value", "");
        cy.findByLabelText("Icon").should("have.value", "");

        // Asure data we saved is displayed
        cy.findByText("Test corp");

        // Delete record that was added
        cy.findByLabelText("Delete Test corp").click();
        cy.findByText("Test corp").should("not.exist");
    });
});
