//-----------LA MODALE FILTRE-----------//
// Chercher la modale pour le spirit filtre
const modalSpirit = document.querySelector(".modal-container-spirit");

// Pour ouvrir la modale
const openModal = document.querySelector(".spirit-modal-trigger-open");
//Lorsque je clique sur "Filtres"
openModal.addEventListener("click", openModalSpirit);

function openModalSpirit() {
  modalSpirit.classList.toggle("active");
}

//Fermer la modale
const closeModal = document.querySelectorAll(".spirit-modal-trigger");
closeModal.forEach((trigger) =>
  trigger.addEventListener("click", toggleModalClosure)
);
function toggleModalClosure() {
  modalSpirit.classList.toggle("active");
}

//-----------LA SELECTION D'ALCOOL(S)-----------

// On récupère le formulaire avec les checkboxes
const spiritForm = document.getElementById("spiritsForm");

spiritForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  //On récupère toutes les checkboxes et on filtre pour garder uniquement les checkboxes cochées
  const checkboxes = Array.from(document.getElementsByName("spirit"));
  const checkedCheckboxes = checkboxes.filter((checkbox) => {
    return checkbox.checked;
  });

  // On va chercher l'id des checkboxes cochées
  const ids = checkedCheckboxes.map((checkbox) => {
    return checkbox.id;
  });

  // On fait appel au back pour récupérer les informations des cocktails de notre base de donnée (nom, instructions, photo et surtout l'ID du spirit du cocktail)
  fetch("/cocktails", {
    method: "POST",
    body: JSON.stringify({ spirits: ids }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData);
        });
      }
      return response.json();
    })
    .then((data) => {
      let cocktails = document.getElementsByClassName("cocktail");
      //On crée un tableau pour stocker les spirits présents et utilisés dans les cocktails de la liste
      window.cocktailsElem = [];
      //Par défaut le spirit tant qu'il n'est pas présent et utilisé il est false, s'il est true il est stocké dans cocktailsElt[]
      let spiritFound = false;
      //On va utiliser ce messageContainer pour faire apparaitre un message à l'utilisateur s'il ne trouve pas de cocktail à base d'un spirit sélectionné
      const messageContainer = document.getElementById("message-container");
      messageContainer.textContent = "";

      // Avec value, on va rechercher le nom du spirit et son id
      const selectedSpirits = checkedCheckboxes.map((checkbox) => {
        return { id: checkbox.id, name: checkbox.value };
      });
      //On crée un tableau pour stocker les spirits  non présents et  non utilisés dans les cocktails de la liste
      let unmatchedSpirits = [];
      //On crée une boucle for pour parcourir tous les éléments des cocktails
      for (let i = 0; i < cocktails.length; i++) {
        let cocktailElt = cocktails[i].getElementsByClassName("cocktail-img");
        let currentCocktailSpiritId = cocktailElt[0].id;
        spiritFound = false;
        //Si on trouve un alcool (via l'id) présent dans un cocktail, on le stock dans cocktailsElt[]
        data.map((cocktailListFiltered) => {
          if (currentCocktailSpiritId == cocktailListFiltered.id) {
            cocktailsElem.push({
              element_id: i,
              ingredient_id: cocktailListFiltered.ingredient_id,
              name:cocktailListFiltered.name,
              id:cocktailListFiltered.id
            });
            spiritFound = true;
          }
        });

        //S'il n'y a pas de spirit utilisé dans un cocktail de notre liste on  masque  les cocktails
        if (!spiritFound) {
        // On met une class "filtered" pour faciliter le second filtre par nom
          cocktails[i].style.display = "none";
          cocktails[i].classList.remove('filtered');
        }
        else {
          cocktails[i].classList.add('filtered');
        }
      }
      //On va trier les spirits via findIndex: on va vérifier s'il y a une correspondance entre l'id du spirit coché(sélectionné)
      // et  l'ingredient_id (le spirit présent dans le cocktail)
      if (cocktailsElem.length > 0) {
        unmatchedSpirits = selectedSpirits.filter((element) => {
          const isFound = cocktailsElem.findIndex((cocktailDisplayed) => {
            return element.id == cocktailDisplayed.ingredient_id;
          });

          //S'il y a aucune correspondance, cela veut dire que le spirit sélectionné n'est pas du tout utilisé
          //dans l'élaboration d'un cocktail présent dans notre liste de cocktails,
          if (isFound === -1) {
            //on le stocke donc dans unmatchedSpirits[]
            return true;
          }
          //S'il y a une correspondance (donc égal à -1) le spirit selectionné est utilisé dans un des cocktails et ne peut pas être stocké dans unmatchedSpirits[]
          return false;
        });
      } else {
        //Si un spirit sélectionné est utilisé dans un cocktail, il va être stocké dans cocktailsElt[] sinon
        // sinon  s'il n'a pas de correspondance, il est ajouté dans unmatchedSpirits[]
        unmatchedSpirits = selectedSpirits;
      }
      if (unmatchedSpirits.length > 0) {
        const messageDiv = document.createElement("div");
        messageContainer.style.display = "block";
        messageDiv.textContent = `Désolé, nous n'avons pas de cocktails à base de ${unmatchedSpirits.map(
          (element) => element.name
        )}`;
        messageContainer.appendChild(messageDiv);      
}
    
        
        })
        resetSpiritFilters();
        toggleModalClosure();
               
      })

 // Désélectionner toutes les cases à cocher
 function resetSpiritFilters() {
  const checkboxes = document.getElementsByName("spirit");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  // Réafficher tous les cocktails
  const cocktails = document.getElementsByClassName("cocktail");
  for (let i = 0; i < cocktails.length; i++) {
    cocktails[i].style.display = "flex";
  }
}