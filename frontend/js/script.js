const searchForm = document.querySelector(".search-form");
document.querySelector("#sreachbyisbn-btn").onclick = () => {
  searchForm.classList.toggle("active");
};
//search in the header section
// Add an event listener for the "Enter" key press in the search input
const userInput = document.getElementById("gotoresult");
const searchButton = document.getElementById("sreachbyisbn-btn");

userInput.addEventListener("input", (event) => {
  const userInputValue = userInput.value.replace(/\D/g, "");
  userInput.value = userInputValue;
  if (userInputValue.length === 13) {
    searchButton.removeAttribute("disabled");
  } else {
    searchButton.setAttribute("disabled", true);
  }
});
// Function to handle the search button click
searchButton.addEventListener("click", () => {
  if (userInput.value.length === 13) {
    const data_recorded = userInput.value;
    localStorage.setItem("data_recorded", data_recorded);
    console.log("searchbutton-addEventListener \t", data_recorded);
    // Redirect to a new page (replace 'newpage.html' with the actual URL)
    window.location.href = "search_result.html";
  }
});

//login section
const loginForm = document.querySelector(".login-form-container");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //TODO LIST go to the main page with the name of the use name inthe nav bar
        if (data.message === "Login successful") {
          // Redirect to the main page with the user's name in the nav bar
          const userEmailElement = document.getElementById("userEmail");
          userEmailElement.textContent = "Welcome " + email;
          console.log(email);

          // Hide the login form
          loginForm.classList.remove("active");
        } else {
          alert(data.message);
        }
      });
  } catch (error) {
    alert(error);
  }
});
document.querySelector("#login-btn").onclick = () => {
  loginForm.classList.toggle("active");
};

document.querySelector("#close-login-btn").onclick = () => {
  loginForm.classList.remove("active");
};

const signUpFrom = document.querySelector(".sign-up-form-container");

document.querySelector("#sign-up-btn").onclick = () => {
  loginForm.classList.remove("active");
  signUpFrom.classList.add("active");
};

document.querySelector("#close-sign-up-btn").onclick = () => {
  signUpFrom.classList.remove("active");
  loginForm.classList.remove("active");
};

document.querySelector("#sign-up-to-login-btn").onclick = () => {
  signUpFrom.classList.remove("active");
  loginForm.classList.add("active");
};
const confirmPasswordInput = document.getElementById(
  "sign-up-confirm-password"
);

confirmPasswordInput.addEventListener("input", () => {
  confirmPasswordInput.setCustomValidity("");
});

signUpFrom.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("sign-up-email").value;
  const password = document.getElementById("sign-up-password").value;

  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    // Handle password mismatch error
    console.log("goto here");
    confirmPasswordInput.setCustomValidity("Passwords don't match");
    confirmPasswordInput.reportValidity();
    return;
  }

  try {
    fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      });
  } catch (error) {
    console.log(error);
  }
});

window.onscroll = () => {
  searchForm.classList.remove("active");

  if (window.scrollY > 80) {
    document.querySelector(".header .header-2").classList.add("active");
  } else {
    document.querySelector(".header .header-2").classList.remove("active");
  }
};

window.onload = () => {
  if (window.scrollY > 80) {
    document.querySelector(".header .header-2").classList.add("active");
  } else {
    document.querySelector(".header .header-2").classList.remove("active");
  }
};

//home swiper function
var swiper = new Swiper(".books-slider", {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

// Book Details Container for featured books section

// Select all elements with the "book-details-trigger" class
const bookDetailsTriggers = document.querySelectorAll(".book-details-trigger");

// Add a click event listener to each trigger
bookDetailsTriggers.forEach((trigger) => {
  trigger.addEventListener("click", async (event) => {
    event.preventDefault();

    // Get the ISBN associated with the clicked trigger
    const isbn = trigger.getAttribute("data-isbn");

    // Fetch book details from your backend based on the ISBN
    const bookDetails = await fetchBookDetails(isbn);

    // Populate and display the book details container (similar to the login form)
    displayBookDetails(bookDetails);
  });
});

async function fetchBookDetails(isbn) {
  // Fetch book details from your backend using the provided ISBN
  // Replace this with your actual fetch code
  try {
    const response = await fetch("http://localhost:3000/searchByIsbn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isbn: isbn }),
    });
    if (response.ok) {
      const mongo_response = await response.json();
      console.log("you clicked and response is ok ", mongo_response.data[0]);
      return mongo_response.data[0];
    } else {
      throw new Error("Failed to fetch book information.");
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
}

function displayBookDetails(bookDetails) {
  // Populate and display the book details container
  const bookDetailsContainer = document.querySelector(
    ".book-details-container"
  );
  const bookDetailsContent = bookDetailsContainer.querySelector(
    ".book-details-content"
  );

  bookDetailsContent.innerHTML = `
    <h3>${bookDetails.title}</h3>
    <p>Author: ${bookDetails.author}</p>
    <p>Price: ${bookDetails.price}</p>
    <p>ISBN: ${bookDetails.ISBN}</p>
    
    <!-- Add more details as needed -->
  `;

  // Display the book details container
  bookDetailsContainer.style.display = "block";
}

// Close the book details container when the close button is clicked
const closeBookDetailsBtn = document.querySelector("#close-book-details-btn");
closeBookDetailsBtn.addEventListener("click", () => {
  const bookDetailsContainer = document.querySelector(
    ".book-details-container"
  );
  bookDetailsContainer.style.display = "none";
});
