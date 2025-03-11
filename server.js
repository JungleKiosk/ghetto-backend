const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Rotta di base per testare se il server è attivo
app.get("/", (req, res) => {
  res.send("🚀 Il server proxy è attivo!");
});

// Rotta per il proxy
app.get("/proxy", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL richiesto" });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Errore nel download: ${response.statusText}`);
    }
    const contentType = response.headers.get("content-type");
    res.set("Content-Type", contentType);
    response.body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server proxy in ascolto su http://localhost:${PORT}`);
});
