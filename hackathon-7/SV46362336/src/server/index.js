const { default: axios } = require("axios");
const express = require("express");

class Server {
  originPath = "/api";
  githubPath = "/github";
  marsPath = "/mars";
  exchangePath = "/exchange"
  pokemonsPath = "/pokemons"
  pokemonsPowerPath = "/pokemonsPower"
  rickmortyPath = "/rickmorty"
  rickmortyDetailsPath = "/rickmortyDetalle"
  cocktailsPath = "/cocktails"
  productsPath = "/products"
  userPath = "/random"

  constructor() {
    this.port = process.env.PORT || 3000;
    this.app = express();

    this.routes();
    this.middleware();
    this.dbConnection();
  }

  routes() {
    this.app.get(`${this.originPath}`, (req, res) => {
      res.send("Hello World!");
    });

    // Api Github
    //api/github/itscalee
    this.app.get(
    `${this.originPath}${this.githubPath}/:username`,
      async (req, res) => {
        const params = req.params;
        console.log("params", params);

        if (!params.username.trim()) {
          // validamos que no envieen datos vacios
          return res.status(400).json({
            errors: {
              message: "se necesita el nombre de usuario",
              code: 400,
            },
          });
        }

        const result = await axios.get(
          `https://api.github.com/users/${params.username}`
        );
        console.log("result api", result.data);

        res.json({
          success: true,
          data: result.data,
        });
      }
    );

    // API NASA
    //https://api.nasa.gov/insight_weather/?api_key=tzHsxY4eqiG29HygHQSvR9SxbmhIKGtgrRk9OVts&feedtype=json&ver=1.0

    this.app.get(
        `${this.originPath}${this.marsPath}`, async (req, res) => {
      const result = await axios.get(
        `https://api.nasa.gov/insight_weather/?api_key=${process.env.NASA_API_KEY}&feedtype=json&ver=1.0`
      );

      return res.json({
        success: true,
        data: result.data,
      });
    });

    //API para clima ciudad no encontré en la lista que nos dio ni buscando, todos de paga

    //API tipo de cambio USD Frankfurter no encuentro que soporte PEN
    this.app.get(
      `${this.originPath}${this.exchangePath}`, async (req, res) => {
        const result = await axios.get(
          `https://api.frankfurter.dev/v1/latest?base=USD`
        )
        return res.json({
          success: true,
          data: result.data
        })
      }
    )

    //API lista de pokemones
    this.app.get(
      `${this.originPath}${this.pokemonsPath}`, async (req, res) => {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=2000`
        )
        return res.json({
          success: true,
          data: result.data
        })
      }
    )

    //API poderes pokemon
    this.app.get(
      `${this.originPath}${this.pokemonsPowerPath}/:name`, async (req, res) => {
        const params = req.params;
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${params.name}`
        )
        return res.json({
          success: true,
          data: result.data.abilities
        })
      }
    )

    //API Rick y Morty
    this.app.get(
      `${this.originPath}${this.rickmortyPath}`, async (req, res) => {
        const result = await axios.get(
          `https://rickandmortyapi.com/api/character/1,2`
        )
        return res.json({
          success: true,
          data: result.data
        })
      }
    )

    //API detalle personaje Rick & Morty, se le debe pasar el ID
    this.app.get(
      `${this.originPath}${this.rickmortyDetailsPath}/:id`, async (req, res) => {
        const params = req.params;
        const result = await axios.get(
          `https://rickandmortyapi.com/api/character/${params.id}`
        )
        return res.json({
          success: true,
          data: result.data
        })
      }
    )

    //API lista de 10 cocktails random
    this.app.get(
      `${this.originPath}${this.cocktailsPath}`, async (req, res) => {
        const numberOfCocktails = 10
        const cocktailNames = []
        
        for (let i = 0; i < numberOfCocktails; i++) {
            const result = await axios.get(
                `https://www.thecocktaildb.com/api/json/v1/1/random.php`
            );
            if (result.data && result.data.drinks && result.data.drinks.length > 0) {
              cocktailNames.push(result.data.drinks[0].strDrink);
            }
        }
        return res.json({
            success: true,
            data: cocktailNames
        });        
      }
    )

    //API lista de productos
    this.app.get(
      `${this.originPath}${this.productsPath}`, async (req, res) => {
        const result = await axios.get(
          `https://fakestoreapi.com/products`
        )
        return res.json({
          success: true,
          data: result.data
        })
      }
    )

    //API random user
    this.app.get(
      `${this.originPath}${this.userPath}`, async (req, res) => {
        const result = await axios.get(
          `https://randomuser.me/api/`
        )
        return res.json({
          success: true,
          data: result.data
        })
      }
    )


  }

  middleware() {}

  dbConnection() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening in port ${this.port}`);
    });
  }
}

module.exports = {
  Server,
};