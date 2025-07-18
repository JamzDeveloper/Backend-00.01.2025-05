import axios from 'axios';

export const getAllPokemon = async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de Pokémon' });
  }
};

export const getPokemonByName = async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Pokémon no encontrado' });
  }
};
