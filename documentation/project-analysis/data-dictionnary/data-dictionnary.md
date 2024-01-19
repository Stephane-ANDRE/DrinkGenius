# USER TABLE

|**field** |**type**|**specification**|**description**|
|:----:|:----:|:----:|:----:|
id      |INT  |GENERATED ALWAYS AS IDENTITY  |user's identification
lastname    |TEXT  |NOT NULL      |user's lastname
firstname| TEXT| NOT NULL | user's firstname
birthdate|DATE|NOT NULL| user's birthdate
location|TEXT|-|user's location
email|TEXT|NOT NULL| user's email
password|TEXT | NOT NULL | user's password
hobbies|TEXT | -| user's hobbies
role_id|ENTITY| NOT NULL | foreign key linking user to role

# ROLE TABLE

|**field** |**type**|**specification**|**description**|
|:----:|:----:|:----:|:----:|
|id|INT| GENERATED ALWAYS AS IDENTITY|role's identification
name|TEXT|NOT NULL|role's name

# INGREDIENT TABLE

|**field** |**type**|**specification**|**description**|
|:----:|:----:|:----:|:----:|
id|INT|GENERATED ALWAYS AS IDENTITY|ingredient's identification
name|TEXT|NOT NULL| ingredient's name
unit|TEXT|-|ingredient's measurement unit
min_quality|INT|NOT NULL| minimum quantity
max_quantity|INT|NOT NULL|maximum quantity

# ASSOCIATION TABLE CONTAIN BETWEEN COCKTAIL AND INGREDIENT

|**field** |**type**|**specification**|**description**|
|:----:|:----:|:----:|:----:|
cocktail_id|ENTITY|NOT NULL|cocktail's id
ingredient_id|ENTITY|NOT NULL|ingredient's id
quantity |INT |NOT NULL | quantity of ingredient in cocktail

# ASSOCIATION TABLE ADD BETWEEN COCKTAIL AND GARNISH

|**field** |**type**|**specification**|**description**|
|:----:|:----:|:----:|:----:|
cocktail_id|ENTITY|NOT NULL|cocktail's id
garnish_id|ENTITY|NOT NULL|garnish's id
quantity |INT |NOT NULL | quantity of ingredient in cocktail

# GARNISH TABLE

|**field** |**type**|**specification**|**description**|
|:----:|:----:|:----:|:----:|
id|INT|GENERATED ALWAYS AS IDENTITY| garnish identification
name|TEXT|NOT NULL|garnish's name
unit|TEXT|-| garnish's measurement unit|

# LABEL TABLE

|**field** |**type**|**specification**|**description**|
|:----:|:----:|:----:|:----:|
id|INT|GENERATED ALWAYS AS IDENTITY |label's identification
name|TEXT|NOT NULL |label's name

# INGREDIENTS HAS LABEL

|**field** |**type**|**specification**|**description**|
|:----:|:----:|:----:|:----:|
ingredient_id|INT|NOT NULL| ingredient_id
label_id| INT |NOT NULL |label_id
