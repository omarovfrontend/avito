const router = require('express').Router();
const { Category, Post, User } = require('../db/models');

router.get('/', async (req, res) => {
  let posts = await Post.findAll({
    include: [{
      model: Category,
    },
    {
      model: User,
    }],
    raw: true,
  });

  posts = posts.map((el) => ({
    ...el, owner: (el.user_id === req.session.userId),
  }));

  res.render('main', { posts }); // отрисовывает hbs main
});

module.exports = router;
