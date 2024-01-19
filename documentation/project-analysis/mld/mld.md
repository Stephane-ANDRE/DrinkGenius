# MLD:
* User (id, lastname, firstname, birthdate, location, email, password, hobbies, #role_id)
* Role (id, name)
* Cocktail (id, name, instruction, picture, validation, #user_id)
*  <span  style='color:red'>Contain(#cocktail(id), #ingredient(id), quantity)</span>
*  <span  style='color:red'>Add(#cocktail_id, #garnish_id, quantity)</span>
* Ingredient (id, name, unit, min_quantity, max_quantity)
* <span  style='color:red'>Ingredient_has_label(#ingredient(id), #label(id))</span>
* <span  style='color:red'>User_like_cocktail(#user(id), #cocktail(id))</span>
* Label (id, name)
* Garnish (id, name, unit, min_quantity, max_quantity)