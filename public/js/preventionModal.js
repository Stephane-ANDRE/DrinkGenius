document.addEventListener("DOMContentLoaded", function () {

    // SessionStorage pour vérifier que la modale Prevention n'apparaisse qu'une seule fois
    if (!localStorage.getItem("modalShown")){
        const modalContainerPrevention = document.getElementById("prevention-modal");
        const birthYearInput = document.getElementById("birth-year");
        const checkAgeButton = document.getElementById("checkAgeButton");
        modalContainerPrevention.classList.toggle("active");
        const errorMessage = document.querySelector("#prevention-modal-form span");

        // Pour savoir si on a la majorité (en France) peu importe l'année qu'on soit
        const currentYear = new Date().getFullYear();
        birthYearInput.max = currentYear.toString();

        checkAgeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const birthYear = parseInt(birthYearInput.value);
            // L'utilisateur n'a pas entré d'année de naissance
            if (isNaN(birthYear)) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Merci d'entrer une date de naissance.";
                errorMessage.style.width = "270px";
                // return;
            // Si l'utilisateur n'a pas 18ans
            } else if (parseInt(birthYear) > currentYear - 18) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Vous devez avoir au moins 18 ans. (redirection vers google).";
                errorMessage.style.width = "270px";
                // Redirection vers Google après 3 secondes
                setTimeout(function() {
                    window.location.href = "https://www.google.fr";
                }, 3000);
            } else if (birthYear < 1900) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Veuillez entrer une année de naissance valide.";
                errorMessage.style.width = "200px";
            // Si + de 18ans, la personne peut profiter du site
            } else {
                localStorage.setItem("modalShown", "true");
                modalContainerPrevention.classList.toggle("active");
            }
        });

    }
});

