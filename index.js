const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const getTalkers = require('./helper/data');
const authEmail = require('./middleware/authEmail');
const authPassword = require('./middleware/authPassword');
const token = require('./middleware/tokenGenerator');
const validateToken = require('./middleware/validateToken');
const validateName = require('./middleware/validateName');
const validateAge = require('./middleware/validateAge');
const validateTalk = require('./middleware/validateTalk');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (_req, res, _next) => {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));

  if (!talkers) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const response = await getTalkers();
  const data = response.find((talker) => talker.id === Number(id));
  if (!data) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(data);
});

// Requisito 3

app.post('/login', authEmail, authPassword, token);

// Requisito 4

app.post('/talker', validateToken, validateName, validateAge, validateTalk);

app.listen(PORT, () => {
  console.log('Online');
});
