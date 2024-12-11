import fs from 'fs';
import express, { application } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = (relativePath) =>
  path.join(path.dirname(fileURLToPath(import.meta.url)), relativePath);

const app = express();

// Middleware phân tích cú pháp body của request có định dạng JSON, chuyển đổi nó thành đối tượng JavaScript và đưa đối tượng JavaScript đó vào req.body
app.use(express.json());

// Đọc file data
const tours = JSON.parse(
  fs.readFileSync(__dirname('/dev-data/data/tours-simple.json'))
);

// Lấy tất cả tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Thêm một tours với id lớn hơn id của tours cuối cùng
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    __dirname('/dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port http://127.0.0.1:${port}/`);
});
