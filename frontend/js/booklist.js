function Booklist() {
  let currentPage = 1;
  const booksPerPage = 20;

  const me = {};

  me.showMessage = function (message) {
    const messagesDiv = document.querySelector("#messages");
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">
    <div>${message}</div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    messagesDiv.append(wrapper);
  };

  me.reloadPrompts = async function () {
    const res = await fetch("/search");
    if (!res.ok) {
      me.showMessage("Error loading prompts");
      return;
    }
    const prompts = await res.json();
    me.renderPrompt(prompts);
  };

  me.renderPrompt = function (prompts) {
    const promptDiv = document.querySelector("#prompts");
    promptDiv.innerHTML = prompts.map(renderPrompt).join("\n");
  };

  me.handleLoadMoreClick = async function () {
    const res = await fetch(
      `/search?page=${currentPage}&MaxElements=${booksPerPage}`
    );
    console.log(`this is the result in me.handleLoadMoreClick \t${res}`);
    if (!res.ok) {
      me.showMessage("Error loading more books");
      return;
    }
    const books = await res.json();
    //const jsonstring = JSON.stringify(books);
    //console.log(`this is the books after res.json\t${JSON.stringify(books)}`);

    if (books.length === 0) {
      me.showMessage("No more books to load.");
      loadMoreButton.disabled = true;
      return;
    }

    // Render the new books and increment the current page.
    me.renderPrompt(books);
    currentPage++;
  };

  const loadMoreButton = document.getElementById("loadMoreButton");
  loadMoreButton.addEventListener("click", me.handleLoadMoreClick);

  return me;
}

const renderPrompt = function (bookData) {
  return `<div class="book-details-container" id="book-details-container">
<h1 id="title">${bookData.title}</h1>
<img src="${
    bookData.image
  }" alt="Book Cover" className="book-image" id="bookImage">
</div><div class="details-container">
  <p><strong>Author:</strong> <span id="author">${bookData.author}</span></p>
  <p><strong>Rating:</strong> <span id="rating">${
    bookData.rating["$numberDouble"]
  }</span></p>
  
  <p><strong>Language:</strong> <span id="language">${
    bookData.language
  }</span></p>
  <p><strong>Genres:</strong> <span id="genres">${JSON.parse(
    bookData.genres.replace(/'/g, '" ')
  )}</span></p>
  <p><strong>Pages:</strong> <span id="pages">${
    bookData.pages["$numberInt"]
  }</span></p>
  <p><strong>Publisher:</strong> <span id="publisher">${
    bookData.publisher
  }</span></p>
  <p><strong>Price:</strong> $<span id="price">${
    bookData.price["$numberDouble"]
  }</span></p><p><strong>Description:</strong> <span id="description">${
    bookData.description
  }</span></p>
  <p><strong>ISBN:</strong> <span id="description">${
    bookData.ISBN
  }</span></p></div>`;
};

const booklist = Booklist();
booklist.reloadPrompts();
