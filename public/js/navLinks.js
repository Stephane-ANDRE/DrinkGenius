const menu = document.getElementById('user-nav');
const links = document.querySelectorAll("#user-nav .nav-item");
const parametersLink = document.querySelector('a[href="/profile/parameters"] div');
const favouritesLink = document.querySelector('a[href="/profile/favourites"] div');
const usercoktailsLink = document.querySelector('a[href="/profile/usercoktails"] div');
const newcocktailLink = document.querySelector('a[href="/profile/newcocktail"] div');
const main = document.querySelector('.profile-content');
const returnLink = document.querySelector(".return-link");
const returnIcon = document.querySelector(".fa-circle-chevron-left");

for (const link of links) {
  link.addEventListener('click', () => {
    links.forEach((link) => {
      link.classList.remove('user-active-btn');
      link.classList.add('user-btn');
    });
    link.classList.remove('user-btn');
    link.classList.add('user-active-btn')
  })
}

// Reponsive
if (window.matchMedia("(max-width: 790px)").matches) {
  const url = window.location.href;
  if (url.includes("/profile/parameters")) {
    parametersLink.addEventListener("click", function(event) {
      event.preventDefault();
      menu.style.display = "none";
      main.style.display = "flex";
      returnLink.style.display = "block";
    })
  } else {
    menu.style.display = "none";
    main.style.display = "flex";
    returnLink.style.display = "block";
  }
} else {
  menu.style.display = "flex";
  returnLink.style.display = "none";
}
