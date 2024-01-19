let toggle = document.getElementById('header-nav-toggle');
let body = document.querySelector('body');

toggle.addEventListener('click', function() {
  body.classList.toggle('open');
})
