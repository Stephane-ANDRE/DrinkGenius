 /**************** PARAMETRES  ****************/

  // ECOUTE SUR LE BOUTON MODIFIER ET AFFICHE LE FORMULAIRE DE MODIFICATION
  const parametersModificationBtn = document.getElementById("parameters-modification-btn");
  const parametersForm = document.getElementById("parameters-form");
  const fields = parametersForm.querySelectorAll("input");
  let message = document.getElementById('parameters-message');


  // ACTIVATION BOUTON SUBMIT
  fields.forEach(function (field) {
    field.addEventListener("input", function () {
      parametersModificationBtn.removeAttribute("disabled");
    });
  });

  // SUBMIT MODIFICATIONS
  parametersModificationBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    const updateForm = document.getElementById("parameters-form");
    await updateUserInfo(updateForm);
  });

  function updateUserInfo (userInfo){
    return fetch("/profile", {
      method: "PATCH",
      body: JSON.stringify(Object.fromEntries(new FormData(userInfo))),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => {
        if (!response.ok){
          throw new Error("La requete a échoué");
        }
        return response.json();
      })
      .then(data => {
        window.location.reload();
      })
      .catch(error => {
        console.error("Erreur", error);
        message.textContent = "Une erreur est survenue. Merci de réessayer ultérieurement."
        setTimeout(() => {
          message.textContent = '';
          window.location.reload();
        }, 2000);
      });}

  /**************** SUPPRIMER SON COMPTE ****************/
  const deleteButton = document.getElementById('delete-account-button');
  const confirmation = document.getElementById('deletion-confirmation');
  deleteButton.addEventListener('click', function(){
    confirmation.style.display = "flex";
    parametersForm.style.display = "none";
    const validation = document.getElementById('validation');
    validation.addEventListener('click', function (){
      fetch('/profile', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
        if (!response.ok){
            throw new Error('la requete a échoué');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = '/'
    })
      .catch(error => {
        console.error("Erreur", error);
        message.textContent = "Une erreur est survenue. Merci de réessayer ultérieurement."
        setTimeout(() => {
          message.textContent = '';
          window.location.reload();
        }, 2000);
      })
    });

    const refusal = document.getElementById('refusal');
    refusal.addEventListener('click', function(){
      confirmation.style.display = "none";
      parametersForm.style.display = "flex";
    })
    });
