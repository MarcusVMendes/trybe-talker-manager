const fs = require('fs');
const data = require('../helper/data');

const writeFile = (newObject) =>
  fs.writeFileSync('./talker.json', JSON.stringify(newObject));

const editTalker = (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = data();

  // let requestedTalker = talkers.find((user) => user.id === Number(id));
  const requestedTalker = {
    id,
    name,
    age,
    talk,
  };

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[talkerIndex] = requestedTalker;
  writeFile(talkers);

  return res.status(201).json(requestedTalker);
};

module.exports = editTalker;
