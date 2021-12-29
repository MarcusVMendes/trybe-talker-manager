const getRandomString = () => Math.random().toString(16).substr(2);

module.exports = (_req, res) => {
  const token = () => (getRandomString() + getRandomString()).substr(0, 16);

  return res.status(200).json({ token: token() });
};

/*
como gerar um token com a lib Math.random()
https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28
*/
