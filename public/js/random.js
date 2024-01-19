const random = {
    machine : document.getElementById("bloc"),
    virginLabel : document.getElementById("generator-virgin-option-label"),
    virginCheckbox : document.getElementById("generator-virgin-option-checkbox"),
    button : document.getElementById("boule"),
    newCocktail: document.getElementById("new-cocktail"),
    door: document.getElementById('door'),
    generatorTitle: document.getElementById('generator-title'),
    randomIngredients : [],

    // Fonction principale
    generateListener: async (event) => {
        event.preventDefault();

        // Desactivation du clic sur le levier le temps de l'animation
        random.button.removeEventListener('click', random.generateListener);
        setTimeout (() => {
            random.button.addEventListener('click', random.generateListener);
        }, "6400")

        // Checkbox Filtre sans alcool
        if(random.virginCheckbox.checked){
            await random.fetchRandomVirginIngredients();
        } else {
        await random.fetchRandomIngredients();
        }
        random.addRandomIngredients();
    },

    // Réinitialisation machine au clic sur faire un noveau cocktail
    newCocktailListener: async (event) => {
        event.preventDefault();
        random.virginLabel.style.display = ("block");
        const list = document.querySelector(".random-list");
        list.remove();
        random.virginCheckbox.checked = false;
        random.newCocktail.style.display = "none";
        random.door.style.height = "60px";
        random.door.style.bottom = "";
        random.generatorTitle.innerText = "Générer un cocktail";
    },

    // Récupération des ingrédients
    fetchRandomIngredients: ()=>{
        return fetch('/random', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok){
                throw new Error();
            }
            return response.json();
        })
        .then(data => {
            random.randomIngredients = data;
        })
        .catch(() => {
         random.generatorTitle.innerText = "La machine semble être en panne. Merci de réessayer plus tard.";
    })},

    // Récupération des ingrédients sans alcool
    fetchRandomVirginIngredients: ()=>{
        return fetch('/randomvirgin', {
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
            random.randomIngredients = data;
        })
        .catch(error => {
         random.generatorTitle.innerText = "La machine semble être en panne. Merci de réessayer plus tard.";
    })},

    // Affichage des ingrédients
    addRandomIngredients: ()=>{
        random.virginLabel.style.display = "none";

        // Réinitialisation liste d'ingrédients
        if (document.querySelector(".random-list")){
            document.querySelector(".random-list").remove();
        }

        // Création de la liste d'ingrédients
        const randomIngredientList = document.createElement('ul');
            randomIngredientList.classList.add('random-list');
            randomIngredientList.classList.add('generator-text-container');
            random.randomIngredients.forEach(ingredient => {
                const randomIngredient = document.createElement('li');
                randomIngredient.classList.add('random-ingredient');
                randomIngredient.textContent = '- ' + ingredient.name + ' : ' + ingredient.quantity + ' ' + ingredient.unit;
                randomIngredientList.appendChild(randomIngredient)
            });
            setTimeout (() => {
            random.machine.appendChild(randomIngredientList);
            random.newCocktail.style.order = ("3");
            random.newCocktail.style.display = "block";
        }, "3400");
        random.newCocktail.style.display = "none";
    },
}

// Ajout de l'event sur le levier
random.button.addEventListener('click', random.generateListener);

// Ajout de l'event sur newCocktail
random.newCocktail.addEventListener("click", random.newCocktailListener);
