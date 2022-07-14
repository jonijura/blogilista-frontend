describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "root",
      name: "Superuser",
      password: "sekret",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("sekret");
      cy.get("#login-button").click();
      cy.contains("blogs");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("wrong username or password");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "root",
        password: "sekret",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("test blog");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#create-button").click();
      cy.contains("test blog");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test blog",
          author: "test author",
          url: "test url",
        });
      });

      it("A blog can be liked", function () {
        cy.contains("test blog").click();
        cy.contains("like").click();
        cy.contains("1 like");
        cy.contains("like").click();
        cy.contains("2 like");
      });

      it("A blog can be deleted", function () {
        cy.contains("test blog").click();
        cy.contains("remove").click();
        cy.contains("Blog test blog by test author removed");
      });

      // it("blogs are sorted according to likes", function () {
      //   cy.createBlog({
      //     title: "more lik-es",
      //     author: "test author 2",
      //     url: "test url 2",
      //   });
      //   cy.get(".blog")
      //     .eq(0)
      //     .should("contain", "test blog")
      //     .contains("more")
      //     .click();
      //   cy.get(".blog").eq(0).contains("like").click();
      //   cy.contains("1 like");
      //   cy.get(".blog").eq(1).contains("more").click();
      //   cy.contains("0 like");
      //   cy.get(".blog").eq(1).contains("like").click();
      //   cy.contains("1 like");
      //   cy.get(".blog").eq(1).contains("like").click();
      //   cy.contains("less").click();
      //   cy.get(".blog").eq(0).should("contain", "more lik-es");
      // });
    });
  });
});
