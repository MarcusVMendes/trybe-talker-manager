const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  return res.status(200).json(talk);
};

module.exports = validateTalk;
