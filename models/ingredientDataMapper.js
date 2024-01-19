const client = require('./dbClient');

const ingredientDataMapper = {
    // OBTENIR DES INGREDIENTS ALEATOIRES
    async getRandomIngredients(){
        let result;
        let error;
        try {
            const response = await client.query(`SELECT
            name, unit,
            CEIL(random()*( (max_quantity - min_quantity) + min_quantity)) AS quantity
            FROM ingredient
            ORDER BY name(random())
            LIMIT (3 + random() * (6 - 3))`);
            result = response.rows;
            if(!result){
                error = "Pas d'ingrédients disponibles."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la récupération des ingrédients."
        };
        return { error, result };
    },

    // OBTENIR DES INGREDIENTS SANS ALCOOL ALEATOIRES
    async getRandomVirginIngredients(){
        let result;
        let error;
        try {
            const response = await client.query(`SELECT name, unit,
            CEIL(random()*( (max_quantity - min_quantity) + min_quantity)) AS quantity
            FROM ingredient
            WHERE ingredient.id NOT IN (
            SELECT ingredient_id
            FROM ingredient_has_label
            WHERE label_id = 1)
            ORDER BY name(random())
            LIMIT (3 + random() * (6 - 3))`);
            result =  response.rows;
            if(!result){
                error = "Une erreur s'est produite avec le serveur."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la récupération des ingrédients."
        };
        return {error, result};
    },

    // OBTENIR TOUS LES INGREDIENTS
    async getAllIngredients(){
        let result;
        let error;
        try {
            const response = await client.query(`SELECT * FROM ingredient ORDER BY name`);
            result =  response.rows;
            if(!result || result.length === 0){
                error = "Aucun ingrédient trouvé."
            }
        } catch(err) {
            console.error(err);
            error = "Une erreur s'est produite lors de la récupération des ingrédients."
        };
        return { result, error };
    },

    // OBTENIR LE NOM D'UN INGREDIENT
    async getSpiritsName(){
        try {
            const result = await client.query(`SELECT ingredient.name AS name, ingredient.id FROM ingredient WHERE ingredient.id IN (SELECT ingredient_id FROM ingredient_has_label WHERE label_id = 1)`)
            return result.rows;
        } catch (error) {
            return {error: "Erreur s'est produite avec le serveur."}
        }
    },
};


module.exports = ingredientDataMapper;