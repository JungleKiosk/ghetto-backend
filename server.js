const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || "https://iicd.geoinnova.it";

app.use(cors());
app.use(express.json());

app.get('/proxy', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }
        const response = await axios.get(`${API_BASE_URL}/${url}`);
        res.json(response.data);
    } catch (error) {
        console.error("Errore nel proxy:", error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
