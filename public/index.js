// Добаваление продукта - через fetch
const { addPost } = document.forms;
const myPosts = document.querySelector('.myPosts');

addPost.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {
    postName, categoryName, img, description,
  } = addPost;

  const response = await fetch('/add', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postName: postName.value,
      categoryName: categoryName.value,
      img: img.value,
      description: description.value,
    }),
  });
  const result = await response.json();

  if (response.ok) {
    console.log(result);

    myPosts.insertAdjacentHTML('afterbegin', `
      <div class="posts">
        <p>
          Название поста:
          ${postName.value}
        </p>
        <p>
          Категория поста:
          ${categoryName.value}
        </p>
        <img style="width: 250px;" src=${img.value} alt="photo">
          <p>
            Описание поста:
            ${description.value}
          </p>
          <p>
            Пользователь:
            ${result.name}
          </p>
          <div data-dataId="${result.id}" class="posts-inner">
          <button data-type="delete" id="delete" class="posts_delete-btn">Удалить</button>
        </div>
    </div>
    `);
    postName.value = '';
    categoryName.value = '';
    img.value = '';
    description.value = '';
  }
});

myPosts.addEventListener('click', async (event) => {
  const button = event.target.dataset.type;
  const targetDiv = event.target.closest('.posts');

  if (button === 'delete') {
    event.preventDefault();
    const id = event.target.closest('div').dataset.dataid;
    console.log(id);
    const response = await fetch(`/delete/${id}`, {
      method: 'delete',
    });
    if (response.ok) {
      targetDiv.remove();
    }
  }
});
