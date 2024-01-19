BEGIN;
DROP TABLE IF EXISTS public.user_like_cocktail CASCADE;
DROP TABLE IF EXISTS public.ingredient_has_label CASCADE;
DROP TABLE IF EXISTS public.label CASCADE;
DROP TABLE IF EXISTS public.garnish_add_into_cocktail CASCADE;
DROP TABLE IF EXISTS public.cocktail_contain_ingredient CASCADE;
DROP TABLE IF EXISTS public.garnish CASCADE;
DROP TABLE IF EXISTS public.ingredient CASCADE;
DROP TABLE IF EXISTS public.user CASCADE;
DROP TABLE IF EXISTS public.cocktail CASCADE;
DROP TABLE IF EXISTS public.role CASCADE;


/* CREATION TABLE ROLE */
CREATE TABLE IF NOT EXISTS public.role
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text  NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (id)
);


/* CREATION TABLE USER */
CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    lastname text  NOT NULL,
    firstname text  NOT NULL,
    birthdate int NOT NULL,
    location text,
    email text  NOT NULL UNIQUE,
    password text  NOT NULL,
    hobbies text,
    confirmed boolean DEFAULT false,
    role_id integer NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT role_id FOREIGN KEY (role_id)
        REFERENCES public.role (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);


/* CREATION TABLE COCKTAIL */
CREATE TABLE IF NOT EXISTS public.cocktail
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text NOT NULL,
    instruction text NOT NULL,
    picture text,
    validation boolean NOT NULL DEFAULT false,
    user_id integer NOT NULL,
    CONSTRAINT cocktail_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);


/* CREATION TABLE INGREDIENT */
CREATE TABLE IF NOT EXISTS public.ingredient
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text NOT NULL,
    unit text,
    min_quantity integer NOT NULL,
    max_quantity integer NOT NULL,
    CONSTRAINT ingredient_pkey PRIMARY KEY (id)
);


/* CREATION TABLE GARNISH */
CREATE TABLE IF NOT EXISTS public.garnish
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text  NOT NULL,
    unit text,
    min_quantity integer NOT NULL,
    max_quantity integer NOT NULL,
    CONSTRAINT garnish_pkey PRIMARY KEY (id)
);


/* CREATION TABLE COCKTAIL_CONTAIN_INGREDIENT */
CREATE TABLE IF NOT EXISTS public.cocktail_contain_ingredient
(
    cocktail_id integer NOT NULL,
    ingredient_id integer NOT NULL,
    quantity integer NOT NULL,
    UNIQUE (cocktail_id, ingredient_id),
    CONSTRAINT cocktail_id FOREIGN KEY (cocktail_id)
        REFERENCES public.cocktail (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT ingredient_id FOREIGN KEY (ingredient_id)
        REFERENCES public.ingredient (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


/* CREATION TABLE GARNISH_ADD_INTO_COCKTAIL */
CREATE TABLE IF NOT EXISTS public.garnish_add_into_cocktail
(
    cocktail_id integer NOT NULL,
    garnish_id integer NOT NULL,
    quantity integer NOT NULL,
    UNIQUE (cocktail_id, garnish_id),
    CONSTRAINT cocktail_id FOREIGN KEY (cocktail_id)
        REFERENCES public.cocktail (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT garnish_id FOREIGN KEY (garnish_id)
        REFERENCES public.garnish (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

/* CREATION TABLE LABEL */
CREATE TABLE IF NOT EXISTS public.label
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text  NOT NULL,
    CONSTRAINT label_pkey PRIMARY KEY (id)
);

/* CREATION TABLE INGREDIENT_HAS_LABEL */
CREATE TABLE IF NOT EXISTS public.ingredient_has_label
(
    ingredient_id integer NOT NULL,
    label_id integer NOT NULL,
    UNIQUE (label_id, ingredient_id),
    CONSTRAINT ingredient_id FOREIGN KEY (ingredient_id)
        REFERENCES public.ingredient (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT label_id FOREIGN KEY (label_id)
        REFERENCES public.label (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

/*CREATION TABLE USER_LIKE_INGREDIENT */
CREATE TABLE IF NOT EXISTS public.user_like_cocktail
(
    user_id integer NOT NULL,
    cocktail_id integer NOT NULL,
    UNIQUE (cocktail_id, user_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.user (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT cocktail_id FOREIGN KEY (cocktail_id)
        REFERENCES public.cocktail (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION newcocktail(
    p_name TEXT,
    p_instruction TEXT,
    p_user_id INTEGER,
    p_ingredients json
) RETURNS VOID AS $$
DECLARE
    v_cocktail_id INTEGER;
    v_ingredient json;
    ingredient_id INTEGER;
    quantity INTEGER;

BEGIN

    INSERT INTO cocktail(name, instruction, picture, validation, user_id)
    VALUES (
        p_name,
        p_instruction,
        'cocktail.png',
        false,
        p_user_id)
    RETURNING id INTO v_cocktail_id;

    FOR v_ingredient IN
        SELECT * FROM json_array_elements(p_ingredients)
    LOOP
        ingredient_id := (v_ingredient->>'ingredient_id')::INTEGER;
        quantity := (v_ingredient->>'quantity')::INTEGER;

    INSERT INTO cocktail_contain_ingredient (cocktail_id, ingredient_id, quantity)
    VALUES (
        v_cocktail_id,
        ingredient_id,
        quantity
    );
    END LOOP;

END;

$$ LANGUAGE PLPGSQL;

COMMIT;