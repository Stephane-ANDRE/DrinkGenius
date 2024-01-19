document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("new-cocktail-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const ingredients = [];
        const quantities = [];

        // Récupération des valeurs pour ingredientId et quantity
        formData.forEach((value, key) => {
            if (key.startsWith('ingredientId')) {
                ingredients.push(value);
            } else if (key.startsWith('quantity')) {
                quantities.push(value);
            }
        });

        // Création d'un objet à envoyer au serveur
        const dataToSend = {
            name: formData.get('name'),
            instruction: formData.get('instruction'),
            ingredientId: ingredients,
            quantity: quantities
        };

        // Envoi des données au serveur
        fetch("/profile/newcocktail", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/profile/usercocktails";
                console.log("Formulaire soumis avec succès !");
            } else {
                throw new Error("Erreur lors de la soumission du formulaire.");
            }
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
    });
});