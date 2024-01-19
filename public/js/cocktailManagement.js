const manageDiv = document.getElementById('manage-cocktails');
const message = document.getElementById('message-display-cocktail-manage');

const validateButton = document.querySelectorAll('.validate-cocktail');

validateButton.forEach(button => {
button.addEventListener('click', function(){
    const cocktailId = this.getAttribute('data-info');
    fetch('/admin/cocktail', {
        method: 'POST',
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
    message.textContent = 'Le cocktail a bien été validé.';
    setTimeout(() => {
        message.textContent = '';
        window.location.reload();
      }, 1500);
    })
    .catch(error => {
        console.error('Erreur', error);
        message.textContent = 'Une erreur est survenue. Merci de ressayer ultérieurement.';
        setTimeout(() => {
            message.textContent = '';
            window.location.reload();
          }, 1500);
    })
})
});

const deleteButton = document.querySelectorAll('.delete-cocktail');
deleteButton.forEach(button => {
button.addEventListener('click', function (){
    const cocktailId = this.getAttribute('data-info');
    fetch('/admin/cocktail', {
        method: 'DELETE',
        body: JSON.stringify({ cocktailId: cocktailId }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error('la requete a échoué')
        }
        return response.json();
    })
    .then(data => {
        message.textContent = 'Le cocktail a bien été supprimé.'
        setTimeout(() => {
            message.textContent = '';
            window.location.reload();
          }, 1500);
        })
    .catch(error => {
        console.error('Erreur', error);
        manageDiv.insertBefore(errorMessage, firstChild);
        setTimeout(() => {
            errorMessage.remove();
            window.location.reload();
          }, 1500);
    })
})
});
