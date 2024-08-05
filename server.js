const express = require('express');
const app = express();
const fs = require('fs');

let frases = [];

// Leer el archivo frases.json al iniciar el servidor
fs.readFile('frases.json', 'utf8', (err, data) => {
  if (err) throw err;
  frases = JSON.parse(data).frases;
});

// Ruta para obtener una frase aleatoria en formato HTML
app.get('/frase', (req, res) => {
  const randomIndex = Math.floor(Math.random() * frases.length);
  const randomFrase = frases[randomIndex];
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Frase Aleatoria</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f8ff;
          overflow: hidden;
        }
        .frase-container {
          text-align: center;
          padding: 20px;
          border: 2px solid #ccc;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          animation: slideUpFadeIn 1s ease-out;
        }
        .frase {
          font-size: 48px; /* Tamaño de la fuente aumentado */
          color: #333;
          margin: 0;
        }
        .button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 18px;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .button:hover {
          background-color: #0056b3;
        }
        .button i {
          margin-right: 8px;
        }
        @keyframes slideUpFadeIn {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      </style>
    </head>
    <body>
      <div class="frase-container">
        <p class="frase">${randomFrase}</p>
        <button class="button" onclick="window.location.reload();"><i class="fas fa-sync-alt"></i>Otra frase</button>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});