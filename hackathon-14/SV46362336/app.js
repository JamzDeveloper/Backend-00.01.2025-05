import express from 'express'
import { createServer } from 'node:http'
import { join,dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Server } from 'socket.io'
import pg from 'pg'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const server  = createServer(app)
const io = new Server(server)

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432
});

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const DEEPSEEK_MODEL = 'deepseek-chat'

if (!DEEPSEEK_API_KEY) {
  console.error('ERROR: La variable de entorno DEEPSEEK_API_KEY no está configurada. Por favor, añádela a tu archivo .env');
  process.exit(1);
}


async function connectDb() {
  try {
    const client = await pool.connect();
    console.log('Conectado a PostgreSQL exitosamente!');
    client.release();
  } catch (err) {
    console.error('Error al conectar a PostgreSQL:', err.message);
    process.exit(1);
  }
}

connectDb()

async function createMessagesTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla "messages" verificada/creada exitosamente.');
  } catch (err) {
    console.error('Error al crear la tabla de mensajes:', err.message);
  }
}

createMessagesTable();

app.get("/", (req, res) => {
    res.sendFile(join(__dirname,"index.html"))
})

io.on('connection', async(socket) => {
    console.log('a user connected')
    try {
    const res = await pool.query('SELECT username, message, timestamp FROM messages ORDER BY timestamp ASC');
    socket.emit('historical messages', res.rows);
  } catch (err) {
    console.error('Error al obtener mensajes históricos:', err.message);
  }
    
    socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on('chat event', async(data) => {
    //guardar en la base de datos
    const { username, message } = data
    try {
      await pool.query(
        'INSERT INTO messages(username, message) VALUES($1, $2)',
        [username, message]
      );
      console.log('Mensaje guardado en la base de datos:', data);
    } catch (err) {
      console.error('Error al guardar el mensaje en la base de datos:', err.message);
    }
     if (data.message.includes("@botIdat")) {
      const botResponseData = { ...data, username: "IdatBot🤖", message: "Estoy pensando en tu respuesta..." };
      io.emit("respuesta", botResponseData); // Informar que el bot está trabajando

      try {
        const deepseekResponse = await axios.post(
          DEEPSEEK_API_URL,
          {
            model: DEEPSEEK_MODEL,
            messages: [{ role: "user", content: message.replace('@botIdat', '').trim() }], // Elimina la mención del bot
            stream: false,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            },
          }
        );

        const botResponseMessage = deepseekResponse.data.choices[0].message.content;

        // Guardar la respuesta del bot en la base de datos
        try {
            await pool.query(
                'INSERT INTO messages(username, message) VALUES($1, $2)',
                [botResponseData.username, botResponseMessage]
            );
            console.log('Respuesta del bot guardada en la base de datos:', botResponseMessage);
        } catch (dbErr) {
            console.error('Error al guardar la respuesta del bot en la base de datos:', dbErr.message);
        }

        // Emitir la respuesta real del bot a todos los clientes
        io.emit("respuesta", { username: "IdatBot🤖", message: botResponseMessage });

      } catch (deepseekErr) {
        console.error('Error al obtener respuesta de DeepSeek API:', deepseekErr.response ? deepseekErr.response.data : deepseekErr.message);
        // Emitir un mensaje de error del bot si falla la API
        io.emit("respuesta", { username: "IdatBot🤖", message: "Lo siento, no pude procesar tu solicitud en este momento." });
      }
    }
    io.emit("respuesta", data);
  })
})



server.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})
