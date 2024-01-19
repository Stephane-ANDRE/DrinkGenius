const client = require('./dbClient');

const dataMapper = {
    // AFFICHER TOUS LES UTILISATEURS NON-ADMIN
    async getAllUsers(){
        let result;
        let error;
        try {
            const response = await client.query(`SELECT * FROM "user" WHERE role_id=2`);
            result = response.rows;
            if(!result || result.length === 0){
                error = "Aucun utilisateur à afficher."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la récupération des utilisateurs."
        };
        return { error, result };
    },

    // CONNEXION
    async getUserByEmail(email){

        let result;
        let error;

        const sqlQuery = {
            text: `SELECT * FROM "user" WHERE email=$1`,
            values: [email]
        };

        try {
            const response = await client.query(sqlQuery);
            result = response.rows[0];
            if (!result) {
                return { error: "Utilisateur non trouvé.", code: "USER_NOT_FOUND", result: null };
            }
        } catch(err) {
            console.log(err)
            return { error: "Une erreur s'est produite de l'authentification.", code: "500", result: null };
        }

        return {error, result};
    },

    // INSCRIPTION USER
    async addOneUser(user){
        // Récupère données du formulaire
        const { lastname, firstname, birthdate, email, password, roleId } = user;
        const insertQuery = {
            text: `INSERT INTO "user"(lastname, firstname, birthdate, email, password, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [lastname, firstname, birthdate, email, password, roleId]
        }

        let result;
        let error;

        try{
            const checkEmailQuery = {
                text: 'SELECT * FROM "user" WHERE email = $1',
                values: [email],
            };

            // Cherche si l'email existe déjà
            const emailCheckResult = await client.query(checkEmailQuery);
            const emailExists = emailCheckResult.rows[0];

            if (emailExists) {
                return { error: "Cet email est déjà enregistré.", code: "DUPLICATE_EMAIL", result: null };
            } else {
                const response = await client.query(insertQuery);
                result = response.rows[0];
            }
            } catch(err){
                return { error: "Une erreur s'est produite lors de l'ajout de l'utilisateur.", code: "DATABASE_ERROR", result: null };
            };

            return {error, result};
    },

    // VALIDATION MAIL USER
    async validateUser (userId) {
        try {
            const sqlQuery = {
                text : 'UPDATE "user" SET confirmed = TRUE WHERE id=$1',
                values : [userId],
            }
            const result = await client.query(sqlQuery);
        } catch (err) {
            return {error: "Le profil n'a pas pu être validé."}
        }
    },

    // MODIFICATION PROFIL
    async updateUser(firstname, lastname, birthdate, email, location, hobbies, id){
        let result;
        let error;
        const sqlQuery = {
            text: `UPDATE "user" SET firstname = $1, lastname = $2, birthdate = $3, email = $4, location =$5, hobbies =$6 WHERE id=$7 RETURNING id, lastname, firstname, birthdate, location, email, hobbies, role_id`,
            values:[firstname, lastname, birthdate, email, location, hobbies, id]
        };
        try {
            const response = await client.query(sqlQuery);
            result =  response.rows[0];
            if(!result){
                error = "Une erreur serveur est survenue. Le profil n'a pas été mis à jour."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la mise à jour."
        };
        return {error, result};
    },

    // DESINSCRIPTION
    async deleteUser(userId){
        let error;
        let result;
        const sqlQuery= {
            text:`DELETE FROM "user" WHERE id=$1`,
            values:[userId]
        };
        try {
            const response = await client.query(sqlQuery);
            result = response.rowCount;
            if(!result || result.length === 0){
                error = "Une erreur s'est produite lors de la suppression. Le profil n'a pas été supprimé."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la suppression."
        };
        return {error, result};
    },

    // RECUPERER LES COCKTAILS FAVORIS PAR UTILISATEUR
    async getFavourites(user_id){
        let error;
        let result;
        const sqlQuery = {
            text: `SELECT * FROM cocktail
            JOIN user_like_cocktail AS favourites ON cocktail.id = favourites.cocktail_id
            WHERE favourites.user_id =$1`,
            values: [user_id]
        };
        try {
            const response = await client.query(sqlQuery);
            result = response.rows;
            if(!result|| result.length === 0){
                error = "Aucun cocktail en favori."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la récupération des favoris."
        };
        return {error, result};
    },

    // RECUPERER LES COCKTAILS PAR UTILISATEUR
    async getUserCocktails(user_id){
        let result;
        let error;
        const sqlQuery = {
            text: 'SELECT * FROM cocktail WHERE user_id=$1',
            values: [user_id]
        };
        try {
            const response = await client.query(sqlQuery)
            result = response.rows;
            if(!result|| result.length === 0){
                error = "Aucun cocktail créé."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la récupération des cocktails."
        };
        return {error, result};
    },

    // AJOUTER UN COCKTAIL AUX FAVORIS DE L'UTILISATEUR
    async addToFavourites(user_id, cocktail_id) {
        let result;
        let error;
        const sqlQuery = {
        text: "INSERT INTO user_like_cocktail(user_id, cocktail_id) VALUES ($1, $2) RETURNING *",
        values: [user_id, cocktail_id],
        };
        try {
            const response = await client.query(sqlQuery);
            result = response;
            if(!result){
                error = "Cocktail ou utilisateur introuvable."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de l'ajout du cocktail."
        };
        return {error, result};
    },

    // SUPPRIMER UN COCKTAIL DES FAVORIS
    async deleteFromFavourites(user_id, cocktail_id){
        let result;
        let error;
        const sqlQuery = {
            text: "DELETE FROM user_like_cocktail WHERE user_id=$1 AND cocktail_id=$2",
            values: [user_id, cocktail_id]
        };
        try {
            const response = await client.query(sqlQuery);
            result = response;
            if(!result){
                error = "Cocktail ou utilisateur introuvable."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la suppression du cocktail."
        };
        return {error, result};
    },

    // ATTRIBUER LE ROLE ADMIN A UN USER
    async updateRoleToAdmin(user_id){
        let error;
        let result;
        const sqlQuery = {
            text: `UPDATE "user" SET role_id=1 WHERE id=$1`,
            values: [user_id]
        }
        try {
            const response = await client.query(sqlQuery);
            result = response;
            if(!response){
                error = "Utilisateur introuvable."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la suppression du cocktail."
        };
        return {error, result};
    }
};

module.exports = dataMapper;