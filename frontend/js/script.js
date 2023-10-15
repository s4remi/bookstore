const searchForm = document.querySelector(".search-form");
document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
};
// //featured books section
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
        const data = await response.json();

        alert("you clicked and response is ok");
        console.log("you clicked and response is ok");
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

document.getElementById("search-form").addEventListener("submit", (event)=> {
  event.preventDefault();
  const isbn = document.getElementById("search-box").value;
  window.location.href = `../book_detail.html?isbn=${isbn}`;
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
        alert(data.message);
      })
      .catch((error) => {
        alert(error);
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
