import express from 'express';
import githubRoutes from './routes/github.routes.js';
import pokeRoutes from './routes/pokemon.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/github', githubRoutes);
app.use('/api/pokemon', pokeRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido al API Gateway del Hackathon Semana 6 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
