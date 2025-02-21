module.exports = (app) => {
  const Stat = app.mongoose.model("Stat", {
    users: Number,
    categories: Number,
    articles: Number,
    createdAt: Date,
  });

  const get = (req, res) => {
    const defaultStat = {
      users: Number,
      categories: Number,
      articles: Number,
    };
    Stat.findOne({}, {}, { sort: { createdAt: -1 } }).then((stat) =>
      res.json(stat || defaultStat)
    );
  };

  return { Stat, get };
};
