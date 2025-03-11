require('dotenv').config(); // ⬅️ Carica il file .env
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL; // ⬅️ Ora usa la variabile d'ambiente

app.use(cors());
app.use(express.json());

app.get('/proxy', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }
        const fullUrl = `${API_BASE_URL}/${url}`; // ⬅️ Usa l'API_BASE_URL corretta
        console.log(`Fetching: ${fullUrl}`);

        const response = await axios.get(fullUrl);
        res.json(response.data);
    } catch (error) {
        console.error("Errore nel proxy:", error.message);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
