// AFFICHAGE DU BOUTON AJOUTER/SUPPRIMER
let favouriteButton = document.querySelectorAll('.add-favourite-btn');
// const cocktailId = document.querySelector('.cocktail-img').getAttribute('data-info');
let favouritesDb = [];

let message = document.getElementById('cocktail-message');

// RECUPERATION DES ID DES COCKTAILS FAVORIS PAR UTILISATEUR CONNECTE
async function getFavouritesId(){
  return await fetch("/profile/usersfavourites", {
    method: "GET",
    headers: {
    "Content-Type": "application/json"
    },
  })
  .then(response => {
    if (!response.ok) {
        throw new Error("La requête a échoué");
    }
    return response.json();
    })
    .then(data => {
      if(data.length>0){
        favouritesDb = data;
      }
    })
    .catch(error => {
    console.error("Erreur : ", error);
    message.textContent = "Une erreur est survenue. Merci de réessayer ultérieurement."
    setTimeout(() => {
      message.textContent = '';
    }, 2000);
  });
}


// AFFICHAGE BOUTON AJOUTER

favouriteButton.forEach(button => {
    // Vous pouvez accéder au cocktailId à partir de l'élément de bouton actuel ici
    const cocktailId = button.getAttribute('data-cocktail-id');
    favouritesToggle(cocktailId, button);
});
  async function favouritesToggle(cocktailId, button) {
  await getFavouritesId();
  const presence = favouritesDb.some(el => el.id === parseInt(cocktailId));
  if(presence){
    button.classList.add('fa-solid');
    button.removeEventListener('click', addFavourite);
    button.addEventListener('click', deleteFavourite);
  } else {
    // ECOUTE SUR LE BOUTON AJOUTER AUX FAVORIS
    button.addEventListener('click', addFavourite);
  };

  function addFavourite() {
    const cocktailId = this.getAttribute("data-cocktail-id");
    // ECRITURE EN BDD DU NOUVEAU COCKTAIL FAVORIS
    fetch("/profile/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cocktailId: cocktailId })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("La requête a échoué");
        }
        return response.json();
      })
      .then(data => {
        button.classList.remove('fa-regular');
        button.classList.add('fa-solid');
        button.removeEventListener('click', addFavourite);
        button.addEventListener('click', deleteFavourite);
      })
      .catch(error => {
        console.error("Erreur : ", error);
      });
    }

    // ECOUTE SUR LE BOUTON DE SUPPRESSION DES FAVORIS

  function deleteFavourite() {
    const cocktailId = this.getAttribute('data-cocktail-id');
    // SUPPRESSION DU COCKTAIL EN BDD
    fetch('/profile/favourites', {
      method: 'DELETE',
        body: JSON.stringify({ cocktailId: cocktailId }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok){
          throw new Error('la requete a échoué')
        }
        return response.json();
      })
      .then(data => {
        button.classList.remove('fa-solid');
        button.classList.add('fa-regular');
        button.removeEventListener('click', deleteFavourite);
        button.addEventListener('click', addFavourite);
        if(window.location.href.includes('/profile/favourites')){
          window.location.reload();
        }
    })
    .catch(error => {
        console.error('Erreur', error)
      })
    }
  }

  favouritesToggle();
