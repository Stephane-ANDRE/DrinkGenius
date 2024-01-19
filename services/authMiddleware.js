// VERIFIE SI UN UTILISATEUR EST CONNECTE
function isAuthed(req, res, next){
    if (!req.session.user){
        res.render('errorPage', {errorMessage: "Veuillez vous connecter."});
    } else {
        next();
    }
};

// VERIFIE SI L'UTILISATEUR CONNECTE EST ADMIN
function isAdmin(req, res, next){
    if(req.session.user && req.session.user.role_id === 1){
        next();
    } else {
        res.render('errorPage', {errorMessage: "Vous n'avez pas les droits pour accéder à cette page."});
    }
};

module.exports = {
    isAuthed,
    isAdmin
}