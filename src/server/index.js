const express = require('express');
const db = require('./db/dbMock')
const cors = require('cors');

const app = express();

app.use(express.static('dist'));
app.use(cors());

app.get('/api/transactions', (req, res)=> {
  res.status(200).json({
    sucess: true,
    message: 'Transactons retrieved successfully',
    results: db
  })
})

app.use((req, res, next) => {
  const err = res.status(404).json({
    error: '404: Sorry Page Not Found!',
  });
  next(err);
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
