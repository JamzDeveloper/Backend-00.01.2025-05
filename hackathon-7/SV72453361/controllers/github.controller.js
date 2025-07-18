import axios from 'axios';

export const getGitHubUser = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Usuario no encontrado en GitHub' });
  }
};
