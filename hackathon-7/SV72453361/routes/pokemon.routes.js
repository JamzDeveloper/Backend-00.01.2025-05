import { Router } from 'express';
import { getAllPokemon, getPokemonByName } from '../controllers/pokemon.controller.js';

const router = Router();

router.get('/', getAllPokemon);
router.get('/:name', getPokemonByName);

export default router;
