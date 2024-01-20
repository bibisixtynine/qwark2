const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const url = `http://${req.headers.host}`;
    const htmlContent = `<!DOCTYPE html><html><body><h1>URL du Serveur: ${url}</h1></body></html>`;

    // Création de index.html
    fs.writeFileSync('index.html', htmlContent);

    // Envoi de index.html
    res.sendFile(__dirname + '/index.html');

    // Suppression de package.json et refresh
    try {
        fs.unlinkSync('package.json');
        console.log('package.json supprimé');
    } catch (err) {
        console.error(err);
    }

    // Exécution de la commande refresh
    exec('refresh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur d'exécution de la commande refresh: ${error}`);
            return;
        }
        console.log(`Sortie de la commande refresh: ${stdout}`);
        if (stderr) {
            console.error(`Erreur de la commande refresh: ${stderr}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
