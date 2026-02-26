const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/consulta-rj', async (req, res) => {
  const chave = req.query.chave;
  if (!chave) {
    return res.status(400).json({ erro: 'Chave de acesso não informada' });
  }

  const url = `http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?p=${chave}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
      timeout: 15000,
      maxRedirects: 5,
    });

    res.send(response.data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
