const { default: axios } = require("axios");
const express = require("express");
const fs = require('fs');

class Server {
  originPath = "/api";
  githubPath = "/github";
  exchangePath = "/exchange";
  weatherPath = "/weather";
  pokemonsPath = "/pokemons"
  pokemonAbilityPath = "/pokemonAbility";
  rickmortyPath = "/rickmorty";
  rickmortyDetailPath = "/rickmortyDetail";
  cocktailPath = "/cocktail";
  productsPath = "/products";
  fakeuserPath = "/fakeuser";
  imagePath  = "/image";
  quotesPath = "/quotes";
  moviePath = "/movie";
  marsPath = "/mars";

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

    // Consultar los datos de GitHub de un usuario especifico.
    // API GitHub
    this.app.get(
      //api/github/tomtt
      `${this.originPath}${this.githubPath}/:username`, async (req, res) => {
        const params = req.params;
        console.log("params", params);

        if (!params.username.trim()) {
          // validamos que no envieen datos vacios
          return res.status(400).json({
            errors: {
              message: "Se requiere ingresar el nombre de usuario",
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

    
    // Consultar el Clima de una ciudad o ubicacion especifica
    // API Tomorrow
    this.app.get(
      `${this.originPath}${this.weatherPath}/:location`, async (req, res) => {
        const { location } = req.params;
        const { TOMORROW_API_KEY } = process.env;
        if (!location.trim()) {
          return res.status(400).json({
            errors: {
              message: "Se requiere ingresar el nombre del lugar",
              code: 400,
            },
          });
        }
        const result = await axios.get(
          `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${TOMORROW_API_KEY}`
        );
        res.json({
          success: true,
          data: result.data,
        });
      }
    );

    // Consultar el tipo de cambio de moneda en Peru
    // API Frankfurter
    // NOTA: se cambió a USD, porque no soporta moneda PEN.
    this.app.get(
      `${this.originPath}${this.exchangePath}`, async (req, res) => {
        const result = await axios.get(
          `https://api.frankfurter.dev/v1/latest?base=USD`
        );
        res.json({
          success: true,
          data: result.data,
        });
      }
    );
    
    // Consultar la lista de Pokemones actual
    // API PokeApi
    this.app.get(
      `${this.originPath}${this.pokemonsPath}`, async (req, res) => {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=2000`
        );
        res.json({
          success: true,
          data: result.data,
        });
      }
    );

    // Consultar los poderes de un pokemon especifico
    // API PokeApi
    this.app.get(
      `${this.originPath}${this.pokemonAbilityPath}/:name`, async (req, res) => {
        const { name } = req.params;
        if (!name.trim()) {
          return res.status(400).json({
            errors: {
              message: "Se requiere ingresar el nombre del pokemon",
              code: 400,
            },
          });
        }
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        res.json({
          success: true,
          data: result.data.abilities,
        });
      }
    );

    // Consultar los principales personajes de Rick and Morty
    // API The Rick and Morty
    this.app.get(
      `${this.originPath}${this.rickmortyPath}`, async (req, res) => { 
        const result = await axios.get(
          `https://rickandmortyapi.com/api/character/1,2`
        );
        res.json({
          success: true,
          data: result.data,
        });
      }
    );

    // Consultar el detalle de cada personaje de Rick and Morty
    // API The Rick and Morty
    this.app.get(
      `${this.originPath}${this.rickmortyDetailPath}/:name`, async (req, res) => {
        const { name } = req.params;
        if (!name.trim()) {
          return res.status(400).json({
            errors: {
              message: "Se requiere ingresar el nombre del personaje",
              code: 400,
            },
          });
        }
        const result = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${name}`
        );
        res.json({
          success: true,
          data: result.data,
        });
      }
    );

    // Consultar el top 10 de bebidas y cocteles
    // API TheCocktailDB
    this.app.get(
      `${this.originPath}${this.cocktailPath}`, async (req, res) => { 
        const letters = [...'abcdefghijklmnopqrstuvwxyz'];
        const dataDrinks = [];
        let count = 0;
        while (count <= 10) {
          const result = await axios.get( 
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letters[Math.floor(Math.random() * letters.length)]}`
          );
          const arrDrinks = result.data.drinks; 
          if (arrDrinks !== null) {
            const drink = arrDrinks[Math.floor(Math.random() * arrDrinks.length)]
            if (drink.strCategory === "Cocktail" || drink.strCategory === "Ordinary Drink") {
              dataDrinks.push(drink);
              count++;
            }
          }
        } 
        res.json({
          success: true,
          data: dataDrinks,
        });
      }
    );

    // Consultar un listado de productos de una tienda
    // FakeStoreAPI
    this.app.get(
      `${this.originPath}${this.fakeuserPath}`, async (req, res) => { 
        const result = await axios.get(
          `https://fakestoreapi.com/products`
        );
        res.json({
          success: true,
          data: result.data,
        });
      }
    );

    // Consultar y traer Fotografias con un determinado tema y tamaño
    // ALTERNATIVA: API Lorem Picsum
    // POSTMAN EJEMPLO: http://localhost:4002/api/image/237?width=200&high=300
    this.app.get(
      `${this.originPath}${this.imagePath}/:id`, async (req, res) => { 
        const { id } = req.params;
        const { width, high } = req.query;
        if (!id.trim() || !width.trim() || !high.trim()) {
          return res.status(400).json({
            errors: {
              message: "Se requiere ingresar el id, width y high de la fotografía",
              code: 400,
            },
          });
        }
        try {
          const result = await axios.get(
            `https://picsum.photos/id/${id}/${width}/${high}`, {
            responseType: 'stream'
          });
          res.setHeader('Content-Type', result.headers['content-type']);
          result.data.pipe(res);
        } catch (error) {
          res.status(500).json({
            errors: {
              message: 'Error al obtener la imagen',
              code: 500,
              details: error.message,
            }
          });
        }
      }
    );


    // Consultar citas famosas
    // ALTERNATIVA: API ZenQuotes.io
    this.app.get(
      `${this.originPath}${this.quotesPath}`, async (req, res) => { 
        const result = await axios.get(
          `https://zenquotes.io/api/quotes`
        );
        res.json({
          success: true,
          data: result.data,
        });
      }
    );

    // Consultar datos ficticios de un usuario
    // API Random User
    this.app.get(
      `${this.originPath}${this.productsPath}`, async (req, res) => { 
        const result = await axios.get(
          `https://randomuser.me/api/`
        );
        res.json({
          success: true,
          data: result.data,
        });
      }
    );

    // Consultar el top de peliculas de estreno    
    // ALTERNATIVA: API TheMovieDB
    this.app.get(
      `${this.originPath}${this.moviePath}`, async (req, res) => { 
        const { THEMOVIEDB_API_KEY } = process.env;
        const result = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${THEMOVIEDB_API_KEY}`
        );
        res.json({
          success: true,
          data: result.data,
        });
      }
    );

    // Consultar datos especificos de Marte
    // API NASA
    // https://api.nasa.gov/insight_weather/?api_key=w66qprA47JwXGEYkl8Bs0A75TnXdhgbxfw1jG87b&feedtype=json&ver=1.0

    this.app.get(`${this.originPath}${this.marsPath}`, async (req, res) => {
      const { NASA_API_KEY } = process.env;
      const result = await axios.get(
        `https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`
      );
      return res.json({
        success: true,
        data: result.data,
      });
    });
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
