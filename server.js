const express = require('express');
const fs = require('fs');
const path = require('path');
const ip = require('ip');

const app = express();
const PORT = process.env.PORT || 80; // Porta 80 para HTTP padrão

app.use(express.static('public'));

app.get('/raw/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'public', filename);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).send('Arquivo não encontrado');
        } else {
            res.type('application/octet-stream');
            res.send(data);
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse o site em http://${ip.address()}:${PORT}`);
});
