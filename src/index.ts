import express from 'express';

const gate = async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });

};

gate().catch((err) => {
  console.error(err);
});



