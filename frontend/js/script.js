const searchForm = document.querySelector(".search-form");
document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
};
//search in the header section
// Add an event listener for the "Enter" key press in the search input

//featured books section
const featuredBooks = document.querySelector("#featured-books-container");

featuredBooks.addEventListener("click", async (event) => {
  event.preventDefault();
  // Check if the click event occurred on an "a" element with the "fa-eye" class
  if (event.target.classList.contains("fa-eye")) {
    // Get the ISBN from the clicked element's id
    const isbn = event.target.id;

    try {
      const response = await fetch("http://localhost:3000/searchByIsbn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isbn: isbn }),
      });
      console.log(
        "from script.js sent fetch should see  you clicked and response is ok"
      );

      if (response.ok) {
        const mongo_response = await response.json();

        //alert("you clicked and response is ok");
        console.log("you clicked and response is ok ", mongo_response.data[0]);
        // print the result
      } else {
        alert("Failed to fetch book information.");
        console.log("response.ok else");
      }
    } catch (error) {
      console.log("from script.js in catch error");
      alert(error);
    }
  }
});

// document.getElementById("").addEventListener("submit", (event) => {
//   event.preventDefault();
//   const isbn = document.getElementById("search-box").value;
//   window.location.href = `../book_detail.html?isbn=${isbn}`;
// });

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

// Book Details Container
const bookDetailsContainer = document.querySelector(".book-details-container");
const closeBookDetailsBtn = document.querySelector("#close-book-details-btn");
const bookDetailImage = document.querySelector("#book-detail-image");
const bookTitle = document.querySelector("#book-title");
const bookPrice = document.querySelector("#book-price");
const addToCartBtn = document.querySelector("#add-to-cart");

// Click event for the fa-eye icon
featuredBooks.addEventListener("click", async (event) => {
  event.preventDefault();

  if (event.target.classList.contains("fa-eye")) {
    // Get the book details
    const isbn = event.target.id;
    // You would fetch book details based on the ISBN here and populate the container
    // For this example, we'll populate with dummy data
    const dummyBookData = {
      title: "Book Title",
      price: "$15.99",
      imageUrl: "./images/book-1.png", // Update with the actual image URL
    };

    // Update the book details container with the data
    bookDetailImage.src = dummyBookData.imageUrl;
    bookTitle.textContent = dummyBookData.title;
    bookPrice.textContent = "Price: " + dummyBookData.price;

    // Display the book details container
    bookDetailsContainer.style.display = "block";
  }
});

// Close book details container
closeBookDetailsBtn.addEventListener("click", () => {
  bookDetailsContainer.style.display = "none";
});
