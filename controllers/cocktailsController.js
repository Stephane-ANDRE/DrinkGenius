const cocktailDataMapper = require("../models/cocktailDataMapper");
const ingredientDataMapper = require("../models/ingredientDataMapper");

const cocktailsController = {
  // AFFICHE LA PAGE DE TOUS LES COCKTAILS
  async renderAllCocktailsPage(req, res){
    const { error, result } = await cocktailDataMapper.getValidatedCocktails();
    const cocktails = result;
    const spirits = await ingredientDataMapper.getSpiritsName();
    let currentRoute = 'cocktails';
    if(error){
      res.render('errorPage', {errorMessage: error});
    } else {
    res.render('cocktailsListPage', {cocktails, spirits, currentRoute});
    }
  },

  // FILTRE LES COCKTAILS SELON L'ALCOOL
  async filterCocktailsBySpirits(req, res) {
    const spirits_id = (req.body.spirits);
    const cocktailsBySpirit = await cocktailDataMapper.getCocktailBySpirits(spirits_id);
    res.json(cocktailsBySpirit);
},

  // AFFICHE LES INFORMATIONS D'UN COCKTAIL
  async renderCocktailInfoPage(req, res){
    const cocktailId = parseInt(req.params.id, 10);
    const { error, result } = await cocktailDataMapper.getCocktailInformation(cocktailId);
    const cocktailInfo = result;
    let currentRoute = "cocktail";
    if(error){
      res.render('errorPage', {errorMessage: error});
    } else {
    res.render('cocktailPage', { cocktailInfo, currentRoute });
    }
  },

  
};

module.exports = cocktailsController;
