```
 showing the result of the searchByIsbn in the navbar
```;

document.addEventListener("DOMContentLoaded", function () {
  // Get the query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);
  console.log("addEventListener", queryParams);
  const isbn = queryParams.get("isbn");
  const title = queryParams.get("title");
  // Add more details as needed

  // Populate the page with the book details
  const bookSection = document.getElementById("book-section");
  const bookInfoDiv = document.createElement("div");
  bookInfoDiv.className = "book-info";
  bookInfoDiv.innerHTML = `
    <h2>${title}</h2>
    <p>ISBN: ${isbn}</p>
    <!-- Add more details as needed -->
  `;
  bookSection.appendChild(bookInfoDiv);
});
