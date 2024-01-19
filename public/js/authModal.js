document.addEventListener("DOMContentLoaded", function () {

  // Modale
  const connectionNavLink = document.querySelector(".modal-trigger-connexion");
  const modalContainer = document.getElementById("auth-modal");
  const modalTitle = document.getElementById("modalTitle");

  // Bouton de fermeture de la modale
  const closeButton = document.getElementById("close-modal");

  // Formulaire
  const form = document.getElementById("auth-modal-form");
  const lastname = document.getElementById("lastname-input");
  const firstname = document.getElementById("firstname-input");
  const birthdate = document.getElementById("date-input");
  const email = document.getElementById("email-input");
  const password = document.getElementById("password-input");
  const confirmation = document.getElementById("confirmation-input");
  const submitButton = document.getElementById("auth-modal-submit-button");

  // Lien already registered
  const alreadyRegisteredLink = document.getElementById("already-registered-link");

  // Message d'erreurs pour les champs du form
  const dateError = document.querySelector("#date-field span");
  const passError = document.querySelector("#pass-field span");
  const confirmationError = document.querySelector("#confirmation-field span");

  // Flags pour contrôle du form
  let dateOK = false;
  let passOK = false;
  let confirmationOK = false;

  // Flag pour switcher entre login et signup
  let isRegistrationModal = false;

  // Listeners Fetch
  const loginListener = (event) => {
    event.preventDefault();
    fetchLogin();
  }

  const signupListener = (event) => {
    event.preventDefault();
    fetchSignup();
  }


  // LISTENERS //

  // Vérification année de naissance
  const ifWrongDateListener = (event) => {
    // Récupération de la saisie de l'utilisateur et de la date actuelle
    const inputValue = event.target.value;
    const currentYear = new Date().getFullYear();
    // Contrôle format date
    if (parseInt(inputValue) < 1900 || inputValue.length > 4) {
      dateError.style.display = "block";
      dateError.innerText = "Veuillez entrer une année de naissance valide.";
      dateOK = false;
    // Contrôle âge
    } else if (parseInt(inputValue) > currentYear - 18) {
      dateError.style.display = "block";
      dateError.innerText = "Vous devez avoir au moins 18 ans.";
      dateOK = false;
    } else {
      dateError.style.display="none";
      dateOK = true;
      // Si tous les champs OK = Activation du bouton submit
      if (dateOK && passOK && confirmationOK) {
        submitButton.removeAttribute("disabled");
      }
    }
  }

  // Vérification mot de passe

  // Récupération du regex
  const passRegex = new RegExp(password.getAttribute("pattern"));

  const ifWrongPassListener = (event) => {
    // Récupération de la saisie de l'utilisateur
    const inputValue = event.target.value;
    // Contrôle format mdp
    if (!passRegex.test(inputValue)) {
      passError.style.display = "block";
      passError.innerText = "Doit contenir au moins 8 caractères, une majuscule, un chiffre, et un caractère spécial.";
      passOK = false;
    } else {
      passError.style.display ="none";
      passOK = true;
    }
    // Comparaison mdp et confirmation
    const confirmationValue = confirmation.value
    if (inputValue === confirmationValue) {
      confirmationOK = true;
      confirmationError.style.display ="none";
    } else {
      confirmationOK = false;
    }
    // Si tous les champs OK = Activation du bouton submit
    if (dateOK && passOK && confirmationOK) {
      submitButton.removeAttribute("disabled");
    }
  }

  // Vérification Confirmation
  const comparePassListener = (event) => {
    // Récupération de la saisie de l'utilisateur (mot de passe et confirmation)
    const passwordValue = password.value
    const inputValue = event.target.value;

    // Comparaison mdp et confirmation
    if (inputValue !== passwordValue ) {
      confirmationError.style.display = "block";
      confirmationError.innerText = "Les mots de passe doivent correspondre.";
      confirmationOK = false;
    } else {
      confirmationError.style.display ="none";
      confirmationOK = true;
      // Si tous les champs OK = Activation du bouton submit
        if (dateOK && passOK && confirmationOK) {
          submitButton.removeAttribute("disabled");
        }
    }
  }

  // Arrivée sur le site après validation du mail
  const urlParams = new URLSearchParams(window.location.search);
  const isConfirmed = urlParams.get('confirmed');

  if (isConfirmed) {
    toggleModalConnexion();
  }

  // Lorsque je clique sur Connexion
  connectionNavLink.addEventListener("click", toggleModalConnexion);

  function toggleModalConnexion() {
    modalTitle.style.color = "var(--theme-purple)";
    modalTitle.style.fontSize = "1.5em";
    modalContainer.classList.toggle("active");
    modalTitle.innerText = "Connexion";
    lastname.style.display = "none";
    firstname.style.display = "none";
    birthdate.style.display = "none";
    confirmation.style.display = "none";
    form.style.marginTop = "-20px";
    form.action = "/login";
    submitButton.style.marginTop = "0px";
    submitButton.innerText = "Se connecter";
    submitButton.removeAttribute("disabled");
    alreadyRegisteredLink.innerText = "Pas encore membre ? Par ici !";
    isRegistrationModal = false;
    dateError.style.display = "none";
    passError.style.display = "none";
    confirmationError.style.display = "none";

    // Suppresssion listener vérification champs
    birthdate.removeEventListener("keyup", ifWrongDateListener);
    password.removeEventListener("keyup", ifWrongPassListener);
    confirmation.removeEventListener("keyup", comparePassListener);

    form.removeEventListener("submit", signupListener);

    //Lorsque que je soumet le form
    form.addEventListener("submit", loginListener);
  }

  // Lorsque que je bascule sur inscription
  function toggleModalInscription() {
    modalTitle.style.color = "var(--theme-purple)";
    modalTitle.style.fontSize = "1.5em";
    modalTitle.innerText = "Remplissez ce formulaire puis remplissez votre verre !";
    lastname.style.display = "block";
    lastname.value = "";
    lastname.setAttribute("required", true);
    firstname.style.display = "block";
    firstname.setAttribute("required", true);
    firstname.value = "";
    birthdate.style.display = "block";
    birthdate.setAttribute("required", true);
    birthdate.value = "";
    confirmation.style.display = "block";
    confirmation.setAttribute("required", true);
    confirmation.value = "";
    email.value = "";
    password.value = "";
    form.style.marginTop = "0px";
    form.action = "/signIn";
    submitButton.style.marginTop = "10px";
    submitButton.innerText = "S'enregistrer";
    submitButton.setAttribute("disabled", "true");
    alreadyRegisteredLink.innerText = "Déjà inscrit ? Par ici !";
    isRegistrationModal = true;

    // Vérification champs
    birthdate.addEventListener("keyup", ifWrongDateListener);
    password.addEventListener("keyup", ifWrongPassListener);
    confirmation.addEventListener("keyup", comparePassListener);

    // Supression du listener login
    form.removeEventListener("submit", loginListener);

    // Ajout du listener signup
    form.addEventListener("submit", signupListener);
  }

  // Lorsque je bascule d'inscription à connexion
  connectionNavLink.addEventListener("click", toggleModalConnexion);

  function switchModalConnexion() {
    modalTitle.style.color = "var(--theme-purple)";
    modalTitle.style.fontSize = "1.5em";
    modalTitle.innerText = "Connexion";
    lastname.style.display = "none";
    lastname.removeAttribute("required");
    lastname.value = "";
    firstname.style.display = "none";
    firstname.removeAttribute("required");
    firstname.value = "";
    birthdate.style.display = "none";
    birthdate.removeAttribute("required");
    birthdate.value = "";
    confirmation.style.display = "none";
    confirmation.removeAttribute("required");
    confirmation.value = "";
    email.value = "";
    password.value = "";
    form.style.marginTop = "-20px";
    form.action = "/login";
    submitButton.innerText = "Se connecter";
    submitButton.removeAttribute("disabled");
    alreadyRegisteredLink.innerText = "Pas encore membre ? Par ici !";
    isRegistrationModal = false;
    dateError.style.display = "none";
    passError.style.display = "none";
    confirmationError.style.display = "none";

    // Suppresssion listener vérification champs
    birthdate.removeEventListener("keyup", ifWrongDateListener);
    password.removeEventListener("keyup", ifWrongPassListener);
    confirmation.removeEventListener("keyup", comparePassListener);

    // Suppression du listener signup
    form.removeEventListener("submit", signupListener);

    // Suppression du listener infos password
    password.removeEventListener("keyup", ifWrongPassListener);

    // Ajout du listener login
    form.addEventListener("submit", loginListener);
  }

  // Clic pour basculer
  alreadyRegisteredLink.addEventListener("click", function (event) {
    event.preventDefault();
    if (isRegistrationModal) {
      // Si l'inscription est affichée, basculez vers la connexion
      switchModalConnexion();
    } else {
      // Sinon, basculez vers l'inscription
      toggleModalInscription();
    }
  });

  // Fermeture de la modale
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModalClosure)
  );

  function toggleModalClosure() {
    modalContainer.classList.toggle("active");
  }

  // Signup + Récupération des messages de succès et d'erreurs
  async function fetchSignup() {
    fetch('/signin', {
      method: 'POST',
      body:  JSON.stringify(Object.fromEntries(new FormData(form))),
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      if (!response.ok){
        return response.json().then(errorData => {
          if (errorData.error) {
            throw new Error(errorData.error); // Erreurs de Joi
          } else {
            throw new Error(errorData); // Erreurs du contrôleur
          }
      });
      }
      return response.json();
    })
    .then(data => {
      switchModalConnexion();
      modalTitle.innerText = data;
      modalTitle.style.fontSize = "1.3em";
      modalTitle.style.color = "green";
    })
    .catch(error => {
      modalTitle.style.color = "red";
      modalTitle.style.fontSize = "1.3em";
      if (error.message.includes('déjà enregistré')) {
        modalTitle.innerText = "Cet e-mail est déjà enregistré.";
      } else if (error.message.includes('must be a valid email')){
        modalTitle.innerText = "E-mail invalide.";
      } else {
        modalTitle.innerText = "Une erreur s'est produite lors de l'inscription.";
      }
    })
  }

  // Login + Récupération des messages de succès et d'erreurs
  async function fetchLogin() {
    const formData = Object.fromEntries(new FormData(form));

    const loginForm = {
      "email": formData.email,
      "password": formData.password
    };

    fetch('/login', {
      method: 'POST',
      body:  JSON.stringify(loginForm),
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      if (!response.ok){
        return response.json().then(errorData => {
          const errorInfo = {
            status: response.status,
            message: errorData,
          }
        throw errorInfo;
      });
      }
      return response.json();
    })
    .then(data => {
      form.style.display = "none";
      alreadyRegisteredLink.style.display = "none";
      modalTitle.style.color = "var(--theme-purple)";
      modalTitle.innerText = data;
      closeButton.style.display = "none";
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    })
    .catch(error => {
      console.log(error.status)
      modalTitle.style.color = "red";
      modalTitle.style.fontSize = "1.3em";
      if (error.status === 400) {
        modalTitle.innerText = error.message;
      } else {
        modalTitle.innerText = "Une erreur s'est produite lors de l'authentification.";
      }
    })
  }

});





