const fs = require('fs');
const data = require('../helper/data');

const writeFile = (newTalker) =>
  fs.writeFileSync('./talker.json', JSON.stringify(newTalker));

const registerTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const lastTalker = data().length;

  const newTalker = {
    id: lastTalker + 1,
    name,
    age,
    talk,
  };

  const newTalkersData = [...data(), newTalker];
  console.log(newTalkersData);
  writeFile(newTalkersData);

  return res.status(201).json(newTalker);
};

module.exports = registerTalker;
