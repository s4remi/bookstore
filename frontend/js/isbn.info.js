function isbn() {
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
    const res = await fetch("/searchByIsbn");
    if (!res.ok) {
      me.showMessage("Error loading prompts");
      return;
    }
    const prompts = await res.json();
    console.log("searchByIsbn\t ", prompts);
    me.renderPrompt(prompts);
  };

  me.renderPrompt = function (prompts) {
    const promptDiv = document.querySelector("#prompts");
    promptDiv.innerHTML = prompts.map(renderPrompt).join("\n");
  };

  return me;
}

const renderPrompt = function (bookData) {
  return `<div class="book-details-container" id="book-details-container">
    <h1 id="title">${bookData.title}</h1>
    <img src="${
      bookData.image
    }" alt="Book Cover" className="book-image" id="bookImage">
    </div><div class="details-container">
      <p><strong>Author:</strong> <span id="author">${
        bookData.author
      }</span></p>
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
      }</span></p></div>`;
};

const book_isbn = isbn();
book_isbn.reloadPrompts();
