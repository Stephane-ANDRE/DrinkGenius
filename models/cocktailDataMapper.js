const client = require('./dbClient');

const cocktailDataMapper = {
    // OBTENIR TOUS LES COCKTAILS VALIDES
    async getValidatedCocktails() {
        let result;
        let error;
        try {
            const response = await client.query(`SELECT * FROM cocktail WHERE validation=true`);
            result = response.rows
            if(!result || result.length === 0){
                error = "Aucun cocktail à afficher."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la récupération des cocktails."
        };
        return {error, result}
    },

    // OBTENIR LES COCKTAILS AVEC LES INGREDIENTS
    async getCocktailBySpirits(ingredient_ids) {
        try {
            const sqlQuery = {
            text: `SELECT DISTINCT ON (cocktail.id) cocktail.*, cocktail_contain_ingredient.ingredient_id
            FROM cocktail
            LEFT JOIN cocktail_contain_ingredient
            ON cocktail.id = cocktail_contain_ingredient.cocktail_id
            WHERE cocktail_contain_ingredient.ingredient_id =ANY($1)`,
            values: [ingredient_ids]
        }
            const result = await client.query(sqlQuery);
            return result.rows;
        } catch(error) {
            return {error: "Une erreur s'est produite avec le serveur."}
        }
    },

    // OBTENIR TOUS LES COCKTAILS EN ATTENTE DE VALIDATION
    async getNotValidatedCocktails() {
        let error;
        let result;
        try {
            const response = await client.query('SELECT * FROM cocktail WHERE validation=false')
            result = response.rows;
            if(!result || result.length === 0){
                error = "Aucun cocktail en attente de validation."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la récupération des cocktails."
        };
        return {error, result};
    },

    // CHANGER LE STATUT D'UN COCKTAIL PAR L'ADMIN
    async updateCocktailStatus(cocktail_id){
        validation = true;
        let error;
        let result;
        const sqlQuery = {
            text:'UPDATE cocktail SET validation=$1 WHERE id=$2',
            values: [validation, cocktail_id]
        };
        try {
            const response = await client.query(sqlQuery);
            result = response;
            if(!result){
                error = "Cocktail introuvable. Merci de réessayer ultérieurement."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la validation du cocktail."
        };
        return { result, error };
    },

    // OBTENIR TOUTES LES INFORMATIONS D'UN COCKTAIL
    async getCocktailInformation(cocktail_id){
        let result;
        let error;   
        const sqlQuery = {
            text: `SELECT cocktail.name, cocktail.instruction, cocktail.picture, cocktail.id,
            CASE
                WHEN COUNT(DISTINCT gaic.quantity) = 0 THEN NULL
                ELSE ARRAY_AGG(DISTINCT
                    jsonb_build_object(
                        'quantity', gaic.quantity,
                        'unit', garnish.unit,
                        'name', garnish.name))
            END AS garnitures,
            ARRAY_AGG(DISTINCT
                jsonb_build_object(
                    'quantity', cci.quantity,
                    'unit', ingredient.unit,
                    'name', ingredient.name)) AS ingredients,
        ARRAY_REMOVE(ARRAY_AGG(DISTINCT label.name), NULL) AS labels
        FROM cocktail
        LEFT JOIN cocktail_contain_ingredient AS cci ON cocktail.id = cci.cocktail_id
        LEFT JOIN ingredient ON ingredient.id = cci.ingredient_id
        LEFT JOIN garnish_add_into_cocktail AS gaic ON cocktail.id = gaic.cocktail_id
        LEFT JOIN garnish ON garnish.id = gaic.garnish_id
        LEFT JOIN ingredient_has_label AS labeling ON ingredient.id = labeling.ingredient_id
        LEFT JOIN label ON label.id = labeling.label_id
        WHERE cocktail.id = $1
        GROUP BY cocktail.name, cocktail.instruction, cocktail.picture, cocktail.id`,
            values: [cocktail_id]
        };
        try {
            const response = await client.query(sqlQuery);
            result = response.rows[0];
            if(!result){
                error = "Oups ! Cocktail introuvable..."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la récupération du cocktail."
        };
        return { result, error };
    },

    // AJOUT D'UN COCKTAIL -- FONCTION
    async addOneCocktailFunction(name, instruction, user_id, ingredientsData){
        let result;
        let error;
        const sqlQuery = {
            text : 'SELECT * FROM newcocktail($1, $2, $3, $4)',
            values: [name, instruction, user_id, ingredientsData]
        };
        try {
            const response = await client.query(sqlQuery);
            result = response;
            if(!result){
                error = "Une erreur s'est produite. Le cocktail n'a pas été ajouté."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de l'ajout du cocktail."
        };
        return { result, error };
    },

    // SUPPRESSION D'UN COCKTAIL
    async deleteCocktail(cocktailId){
        let error;
        let result;
        const sqlQuery = {
            text: 'DELETE FROM cocktail WHERE cocktail.id = $1',
            values: [cocktailId]
        };
        try {
            const response = await client.query(sqlQuery);
            result = response;
            if(!result || result.length === 0){
                error = "Cocktail introuvable. Le cocktail n'a pas été supprimé."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la suppression du cocktail."
        };
        return { error, result };
    }
}

module.exports = cocktailDataMapper;