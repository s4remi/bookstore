const loadBook = (bookData) => {
  document.title = bookData.title;
  document.getElementById("book-details-container").innerHTML = `<div>
<h1 id="title">${bookData.title}</h1>
<img src="${
    bookData.image
  }" alt="Book Cover" className="book-image" id="bookImage">
</div><div class="details-container">
  <p><strong>Author:</strong> <span id="author">${bookData.author}</span></p>
  <p><strong>Rating:</strong> <span id="rating">${bookData.rating}</span></p>
  
  <p><strong>Language:</strong> <span id="language">${
    bookData.language
  }</span></p>
  <p><strong>Genres:</strong> <span id="genres">${JSON.parse(
    bookData.genres.replace(/'/g, '" '),
  )}</span></p>
  <p><strong>Pages:</strong> <span id="pages">${
    bookData.pages
  }</span></p>
  <p><strong>Publisher:</strong> <span id="publisher">${
    bookData.publisher
  }</span></p>
  <p><strong>Price:</strong> $<span id="price">${
    bookData.price
  }</span></p><p><strong>Description:</strong> <span id="description">${
    bookData.description
  }</span></p></div>`;
};

document.addEventListener("DOMContentLoaded", () => {
  const isbn = new URLSearchParams(window.location.search).get("isbn");
  fetch(`/books?isbn=${isbn}`)
    .then((response) =>
      response.json().then((data) => {
        console.log(data);
        loadBook(data);
      }),
    )
    .catch(() => {
      document.querySelector(".book-details-container").innerHTML =
        "Something wrong with showing the book, please try again later";
    });
});