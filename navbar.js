const burgerEl = document.querySelector('.fa-bars')

const navEl = document.querySelector('.navlinker')

burgerEl.addEventListener('click', showNav)

/* Funksjon som viser nav */
function showNav(){
    console.log("Du trykket på hamburgermenyen")

  /* Legger til klassen show til nav-elementet, hvis den ikke har det, og fjerner den hvis den ikke har det -- virker som en  bryter */
  navEl.classList.toggle('show')
}