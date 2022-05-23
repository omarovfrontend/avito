const router = require('express').Router();
const { Category, Post } = require('../db/models');
const checkAuth = require('../middleware/checkAuth');

router.post('/add', checkAuth, async (req, res) => {
  const {
    postName, categoryName, img, description,
  } = req.body;
  console.log('=====>', req.body);

  try {
    const [categoryAdd] = await Category.findOrCreate({
      where: {
        name: categoryName,
      },
      defaults: {
        name: categoryName,
      },
    });
    console.log(categoryAdd);
    const newPost = await Post.create(
      {
        title: postName,
        description,
        img,
        category_id: categoryAdd.id,
        user_id: req.session.userId,
      },
    );
    res.json({ category: newPost.category_id, name: req.session.name, id: newPost.id });
  } catch (error) {
    res.send('Упппссс, не вышло!');
  }
});

// ручка для удаления поста
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Post.destroy({
    where: {
      id,
    },
  });
  const a = await Post.findByPk(id);
  console.log('=====>', a);
  res.json({ isUpdatedSuccessful: true });
});

module.exports = router;
