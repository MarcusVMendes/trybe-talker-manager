const fs = require('fs');

module.exports = () => {
  try {
    const res = fs.readFileSync('./talker.json');
    const data = JSON.parse(res);

    return data;
  } catch (err) {
    return [];
  }
};
