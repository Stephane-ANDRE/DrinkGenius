/*********** AJOUTER UN NOUVEL INGREDIENT ET SA QUANTITE ***********/
// let ingredientCounter = 1;
let ingredients = [];
const newIngredientButton = document.querySelector('.add-ingredient-button')
let message = document.getElementById('newcocktail-message');

// RECUPERER LES INGREDIENTS
function fetchIngredients (){
    return fetch('/ingredients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok){
            throw new Error('la requete a échoué')
        }
        return response.json();
    })
    .then(data => {
        ingredients = data;
    })
    .catch(error => {
        console.error("Erreur : ", error);
        message.textContent = "Une erreur est survenue. Merci de réessayer ultérieurement."
        setTimeout(() => {
          message.textContent = '';
        }, 2000);
    })};


async function createNewDropDown(){
    // INGREDIENTS
    const ingredientSection = document.getElementById('ingredients-section');
    await fetchIngredients();

    const ingredientLabel = document.createElement('label');
    const ingredientInputContainer = document.createElement('div');
    ingredientInputContainer.classList.add('ingredient-input-container');
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = " retirer";
    deleteBtn.style.color = "red";
    deleteBtn.style.cursor = "pointer";
    const ingredientInput = document.createElement('select');
    ingredientInput.classList.add('new-cocktail-dropdown');
    ingredientInput.name = `ingredientId`;
    ingredientInputContainer.appendChild(ingredientInput);
    ingredientInputContainer.appendChild(deleteBtn);

    ingredients.forEach(ingredient => {
        const newOption = document.createElement('option');
        newOption.value = ingredient.id;
        newOption.text = `${ingredient.name} (${ingredient.unit})`;

        ingredientInput.appendChild(newOption);
    })

    const quantityLabel = document.createElement('label');
    quantityLabel.setAttribute('for', 'quantity-input');
    quantityLabel.textContent ="Quantité";
    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.classList.add('quantity-input');
    quantityInput.name = `quantity`;

    deleteBtn.addEventListener("click", () => {
        ingredientInputContainer.remove();
        quantityLabel.remove();
        quantityInput.remove();
    });

    ingredientSection.appendChild(ingredientInputContainer);
    ingredientSection.appendChild(quantityLabel);
    ingredientSection.appendChild(quantityInput);
};

newIngredientButton.addEventListener('click', async function(){
    await createNewDropDown();
})