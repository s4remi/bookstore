// Retrieve the data_recorded value from localStorage
const data_recorded = localStorage.getItem("data_recorded");

if (data_recorded) {
  // Use the data_recorded value as needed
  console.log("new starts ", data_recorded);
  localStorage.removeItem("data_recorded");
  fetchBookByIsbn(data_recorded);
}

// Function to fetch book details by ISBN
async function fetchBookByIsbn(data_recorded) {
  console.log("in the function for fetching ", data_recorded);
  try {
    const response = await fetch("/searchByIsbn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isbn: data_recorded,
      }),
    });
    if (response.ok) {
      const bookDetails = await response.json();
      if (bookDetails.data) {
        console.log("after fetch ", bookDetails.data[0]);
        loadBook(bookDetails.data[0]);
      } else {
        alert("Book not found");
      }
    } else {
      alert("Failed to fetch book details");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching book details");
  }
}

const loadBook = (mongo_response) => {
  document.title = mongo_response.title;
  document.getElementById("prompts_isbn").innerHTML = `<div>
<h1 id="title">${mongo_response.title}</h1>
<img src="${
    mongo_response.image
  }" alt="Book Cover" className="book-image" id="bookImage">
</div><div class="details-container">
  <p><strong>Author:</strong> <span id="author">${
    mongo_response.author
  }</span></p>
  <p><strong>Rating:</strong> <span id="rating">${
    mongo_response.rating
  }</span></p>
  
  <p><strong>Language:</strong> <span id="language">${
    mongo_response.language
  }</span></p>
  <p><strong>Genres:</strong> <span id="genres">${JSON.parse(
    mongo_response.genres.replace(/'/g, '" ')
  )}</span></p>
  <p><strong>Pages:</strong> <span id="pages">${mongo_response.pages}</span></p>
  <p><strong>Publisher:</strong> <span id="publisher">${
    mongo_response.publisher
  }</span></p>
  <p><strong>Price:</strong> $<span id="price">${
    mongo_response.price
  }</span></p>
  <p><strong>Description:</strong> <span id="description">${
    mongo_response.description
  }</span></p>
  <p><strong>ISBN:</strong> <span id="description">${
    mongo_response.ISBN
  }</span></p></div>`;
};
