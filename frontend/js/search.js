// Add an event listener to your search button
document.getElementById("search-btn").addEventListener("click", () => {
  console.log("click here!");
  const searchQuery = document.getElementById("search-box").value;
  // an API endpoint for searching books
  //make an API request to search for the book.
  fetch(`http://localhost:3000/search?query=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        console.log(data);
        // Redirect to the book details
        //window.location.href = `/book-details?isbn=${data.isbn}`;
      } else {
        alert("Book not found");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
});

function myFunction() {
  alert("The form was submitted");
}

function search() {
  console.log("click here!");
  const searchQuery = document.getElementById("search-box").value;
  // an API endpoint for searching books
  //make an API request to search for the book.
  fetch(`http://localhost:3000/search?query=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        console.log(data);
        // Redirect to the book details
        //window.location.href = `/book-details?isbn=${data.isbn}`;
      } else {
        alert("Book not found");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}
