const roles = require('./seedings/seeding_role.json');
const users = require('./seedings/seeding_user.json');
const cocktails = require('./seedings/seeding_cocktail.json');
const labels = require('./seedings/seeding_label.json');
const ingredients = require('./seedings/seeding_ingredient.json');
const cocktailContainIngredient = require('./seedings/seeding_cocktail_contain_ingredient.json');
const garnishes = require('./seedings/seeding_garnish.json');
const garnishAddIntoCocktail = require('./seedings/seeding_garnish_add_into_cocktail.json');
const ingredientHasLabel = require('./seedings/seeding_ingredient_has_label.json');
const userLikesCocktail = require('./seedings/seeding_user_like_cocktail.json');
const client = require('../models/dbClient');

async function importRoles(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const role of roles){
        sqlParameters.push(`($${counter})`);
        counter+=1;

        sqlValues.push(role.name)
        };
    const sqlQuery = `
    INSERT INTO "role"("name")
    VALUES ${sqlParameters.join()};
    `;

    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'role' !")
    }
};

async function importUsers(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const user of users){
        sqlParameters.push(`($${counter}, $${counter +1}, $${counter +2}, $${counter +3}, $${counter +4}, $${counter +5})`);
        counter+=6;

        sqlValues.push(user.lastname);
        sqlValues.push(user.firstname);
        sqlValues.push(user.birthdate);
        sqlValues.push(user.email);
        sqlValues.push(user.password);
        sqlValues.push(user.role_id);
    };

    const sqlQuery = `
    INSERT INTO "user"("lastname", "firstname", "birthdate", "email", "password", "role_id")
    VALUES ${sqlParameters.join()};
    `;    

    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'user' !")
    };
};

async function importCocktails(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const cocktail of cocktails){
        sqlParameters.push(`($${counter}, $${counter +1}, $${counter +2}, $${counter +3}, $${counter +4})`);
        counter+=5;

        sqlValues.push(cocktail.name);
        sqlValues.push(cocktail.instruction);
        sqlValues.push(cocktail.picture);
        sqlValues.push(cocktail.validation);
        sqlValues.push(cocktail.user_id);
        };

    const sqlQuery = `
    INSERT INTO "cocktail"("name", "instruction", "picture", "validation", "user_id")
    VALUES ${sqlParameters.join()};
    `;    

    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'cocktail' !")
    };
};

async function importLabels(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const label of labels){
        sqlParameters.push(`($${counter})`);
        counter+=1;

        sqlValues.push(label.name)
        };

    const sqlQuery = `
    INSERT INTO "label"("name")
    VALUES ${sqlParameters.join()};
    `;    
    
    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'label' !")
    };
};

async function importIngredients(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const ingredient of ingredients){
        sqlParameters.push(`($${counter}, $${counter +1}, $${counter +2}, $${counter +3})`);
        counter+=4;

        sqlValues.push(ingredient.name)
        sqlValues.push(ingredient.unit);
        sqlValues.push(ingredient.min_quantity);
        sqlValues.push(ingredient.max_quantity);
        };
    
        const sqlQuery = `
    INSERT INTO "ingredient"("name", "unit", "min_quantity", "max_quantity")
    VALUES ${sqlParameters.join()};
    `;    
    
    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'ingredient' !")
    };
};

async function importCocktailContainIngredient(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const relation of cocktailContainIngredient){
        sqlParameters.push(`($${counter}, $${counter +1}, $${counter +2})`);
        counter+=3;

        sqlValues.push(relation.cocktail_id);
        sqlValues.push(relation.ingredient_id);
        sqlValues.push(relation.quantity);    
    };

    const sqlQuery = `
    INSERT INTO "cocktail_contain_ingredient"("cocktail_id", "ingredient_id", "quantity")
    VALUES ${sqlParameters.join()};
`;    

    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'cocktail_contain_ingredient' !")
    };
};

async function importGarnish(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const garnish of garnishes){
        sqlParameters.push(`($${counter}, $${counter +1}, $${counter +2}, $${counter +3})`);
        counter+=4;

        sqlValues.push(garnish.name)
        sqlValues.push(garnish.unit);
        sqlValues.push(garnish.min_quantity);
        sqlValues.push(garnish.max_quantity);
        };
    
        const sqlQuery = `
    INSERT INTO "garnish"("name", "unit", "min_quantity", "max_quantity")
    VALUES ${sqlParameters.join()};
    `;    
    
    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'garnish' !")
    };
};

async function importGarnishAddIntoCocktail(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const relation of garnishAddIntoCocktail){
        sqlParameters.push(`($${counter}, $${counter +1}, $${counter +2})`);
        counter+=3;

        sqlValues.push(relation.cocktail_id);
        sqlValues.push(relation.garnish_id);
        sqlValues.push(relation.quantity);    
    };

    const sqlQuery = `
    INSERT INTO "garnish_add_into_cocktail"("cocktail_id", "garnish_id", "quantity")
    VALUES ${sqlParameters.join()};
`;    

    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'garnish_add_into_cocktail' !")
    };
};

async function importIngredientHasLabel(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const relation of ingredientHasLabel){
        sqlParameters.push(`($${counter}, $${counter +1})`);
        counter+=2;

        sqlValues.push(relation.ingredient_id);
        sqlValues.push(relation.label_id);
    };

    const sqlQuery = `
    INSERT INTO "ingredient_has_label"("ingredient_id", "label_id")
    VALUES ${sqlParameters.join()};
`;    

    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'ingredient_has_label' !")
    };
};

async function importUserLikeCocktail(){
    let counter = 1;
    let sqlValues = [];
    let sqlParameters = [];

    for(const relation of userLikesCocktail){
        sqlParameters.push(`($${counter}, $${counter +1})`);
        counter+=2;

        sqlValues.push(relation.user_id);
        sqlValues.push(relation.cocktail_id);
    };

    const sqlQuery = `
    INSERT INTO "user_like_cocktail"("user_id", "cocktail_id")
    VALUES ${sqlParameters.join()};
    `;    

    const response = await client.query(sqlQuery, sqlValues);
    if(response.rowCount>0){
        console.log("Les données ont bien été ajoutées dans la table 'user_like_cocktail' !")
    };
};



importRoles();
importUsers();
importCocktails();
importLabels();
importIngredients();
importCocktailContainIngredient();
importGarnish();
importGarnishAddIntoCocktail();
importIngredientHasLabel();
importUserLikeCocktail();