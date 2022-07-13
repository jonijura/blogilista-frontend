Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3003/api/blogs",
    body: {
      title: title,
      author: author,
      url: url,
      userId: JSON.parse(localStorage.getItem("loggedBlogAppUser")).id,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedBlogAppUser")).token
      }`,
    },
  });
  cy.visit("http://localhost:3000");
});
