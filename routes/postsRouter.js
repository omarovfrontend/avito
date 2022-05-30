const router = require('express').Router();
const { Category, User, Post } = require('../db/models');
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
        // category: categoryName,
        description,
        img,
        category_id: categoryAdd.id,
        user_id: req.session.userId,
      },
    );
    const user = await User.findByPk(req.session.userId);
    // res.json({ category: newPost.category_id, name: req.session.name, id: newPost.id });
    res.json({ newPost, user, categoryAdd });
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

// ручка для изменения поста
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      postName, categoryName, img, description,
    } = req.body;

    let cat = await Category.findOne({ where: { name: categoryName } });
    if (!cat) {
      cat = await Category.create({ name: categoryName });
    }
    await Post.update({
      title: postName,
      // category: categoryName,
      category_id: cat.id,
      img,
      description,
      user_id: req.session.userId,
    }, { where: { id } });
    const testPost = await Post.findByPk(id);
    res.json(testPost);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
