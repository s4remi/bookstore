// Might be better to remove the unused code in this file

/*


const searchTitleList = document.getElementById("searchTitleList");
const goto_result = document.getElementById("gotoresult");
let book_list = [];

goto_result.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = book_list.filter((character) => {
    return (
      character.title.toLowerCase().includes(searchString) ||
      character.price.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("/searchByTitle");
    book_list = await res.json();
    displayCharacters(book_list);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (book_list) => {
  const htmlString = book_list
    .map((character) => {
      return `
            <li class="character">
                <h2>${character.title}</h2>
                <p>Price: ${character.price}</p>
                <img src="${character.image}"></img>
            </li>
        `;
    })
    .join("");
  goto_result.innerHTML = htmlString;
};

loadCharacters();
*/
