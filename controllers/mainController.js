const ingredientDataMapper = require('../models/ingredientDataMapper')

const mainController = {
  // AFFICHE LA PAGE D'ACCUEIL
  async renderHomePage (req,res){
    let currentRoute = 'accueil';
    res.render('homePage', {currentRoute});
  },

  // AFFICHE LES MENTIONS LEGALES
  async renderLegalNoticePage (req,res){
    res.render('legalNoticePage');
  },

  // GENERE UNE RECETTE ALEATOIRE AVEC ALCOOL
  async getRandomRecipe(req, res){
    const { result, error } = await ingredientDataMapper.getRandomIngredients();
    const randomIngredients = result;
    if(randomIngredients){
    res.json(randomIngredients); 
  } else {
    res.json(error);
  }
  },

  // GENERE UNE RECETTE ALEATOIRE SANS ALCOOL
  async getRandomVirginRecipe(req, res){
      const { result, error } = await ingredientDataMapper.getRandomVirginIngredients();
      const randomVirginIngredients = result;
      if(randomVirginIngredients){
      res.json(randomVirginIngredients);
    } else {
      res.json(error);
    }
  }
};

module.exports = mainController;