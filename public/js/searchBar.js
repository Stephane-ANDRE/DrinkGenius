   // Utiliser la searchbar en faisant une sélection par nom de cocktails
function search_cocktail() {
   
      // Récupérer la valeur de la barre de recherche par l'id de la searchbar
      let input = document.getElementById("searchbar").value.toLowerCase();

      // On récupère les cocktails qui ont été filtrés (et donc à qui on a mit une class filtered au moment du filtre par alcools)
      cocktailsSearch = document.getElementsByClassName("filtered"); 

      // Est-ce qu'on a des cocktails qui avaient été filtrés ?
      if(cocktailsSearch.length <= 0) {
        cocktailsSearch = document.getElementsByClassName("cocktail");
      }

      // Boucle for avec variable "i" comme indice, elle commence à 0 jusqu'à la fin de la liste des cocktails
      for (let i = 0; i < cocktailsSearch.length; i++) {
    
        // Obtenir un élément de la liste
      let cocktailTitleElt = cocktailsSearch[i].getElementsByClassName("cocktail-title")

    
      //S'il n'y a pas de charactère en commun entre ce qu'on tape et les noms des cocktails
      //Il n'affiche rien. Sinon cela affiche le ou les cocktails concernés
        if (!cocktailTitleElt[0].innerHTML.toLowerCase().includes(input)) {
          cocktailsSearch[i].style.display = "none";
        } else {
          cocktailsSearch[i].style.display = "flex";
        }
      }      
    
}


  
 

