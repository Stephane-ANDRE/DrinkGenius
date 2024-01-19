const manageDiv = document.getElementById('manage-users');
const message = document.getElementById('message-display-user-manage');

// SUPPRESSION D'UN UTILISATEUR
const deleteButton = document.querySelectorAll('.delete-user');
deleteButton.forEach(button => {
button.addEventListener('click', function (){
    const userId = this.getAttribute('user-info');
    fetch('/admin/user', {
        method: 'DELETE',
        body: JSON.stringify({ userId: userId }),
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
        message.textContent = 'Le compte utilisateur a bien été supprimé.';
        setTimeout(() => {
            message.textContent ='';
            window.location.reload();
          }, 1500);
        })
    .catch(error => {
        console.error('Erreur', error);
        message.textContent = 'Une erreur est survenue. Merci de réessayer.';
        setTimeout(() => {
            message.textContent ='';
            window.location.reload();
          }, 1500);
    })
})
});

// ATTRIBUTION DU ROLE ADMIN A UN USER
const adminBtn = document.querySelectorAll('.admin-user');
adminBtn.forEach(button =>{
    button.addEventListener('click', function(){
        const userId = this.getAttribute('user-info');
        fetch('/admin/role', {
            method: 'PATCH',
        body: JSON.stringify({ userId: userId }),
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
        message.textContent = "Le role a bien été mis à jour";
        setTimeout(() => {
            message.textContent = '';
            window.location.reload();
          }, 1500);
        })
    .catch(error => {
        console.error('Erreur', error);
        message.textContent = 'Une erreur est survenue. Merci de réessayer.';
        setTimeout(() => {
            message.textContent = '';
            window.location.reload();
          }, 1500);
        })
    })
});