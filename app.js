import fs from 'fs';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = (relativePath) =>
  path.join(path.dirname(fileURLToPath(import.meta.url)), relativePath);

const app = express();

const tours = JSON.parse(
  fs.readFileSync(__dirname('/dev-data/data/tours-simple.json'))
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port http://127.0.0.1:${port}/`);
});
