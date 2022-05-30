// ручка для добавление продукта
const { addPost } = document.forms;
const myPosts = document.querySelector('.myPosts');

function insertPost(result) {
  return `
    <div class="posts">
      <p class="title-post">
        Название поста: ${result.newPost.title}
      </p>
      <p class="category-post">
        Категория поста: ${result.categoryAdd.name}
      </p>
      <img class="img-post" style="width: 250px;" src=${result.newPost.img} alt="photo">
      <p class="description-post">
        Описание поста: ${result.newPost.description}
      </p>

      <div data-dataId="${result.newPost.id}" class="posts-inner">
        <button data-type="delete" id="delete" class="posts_delete-btn">Удалить</button>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Изменить
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div data-id="${result.newPost.id}" class="modal-body">
                <form name="editPost" class="editPost">
                  <div class="addPost_card">
                    <label for="name" class="form-label">Название Поста:</label>
                    <input class="input" required="required" type="text" name="postName" placeholder="name..." />
                  </div>

                  <div class="addPost_card">
                    <label for="name" class="form-label">Категория Поста:</label>
                    <input class="input" required="required" type="text" name="categoryName" placeholder="name..." />
                  </div>

                  <div class="addPost_card">
                    <label for="name" class="form-label">Ссылка на картинку:</label>
                    <input class="input" required="required" type="text" name="img" placeholder="вставьте ссылку..." />
                  </div>

                  <div class="addPost_card">
                    <label for="name" class="form-label">Описание Поста:</label>
                    <input class="input" required="required" type="text" name="description" placeholder="description..." />
                  </div>

                  <div data-id="${result.newPost.id}" class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="submit" id="edit" class="btn btn-primary" data-bs-dismiss="modal">Сохранить</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

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

  if (response.ok) {
    const result = await response.json();
    console.log(result);

    myPosts.insertAdjacentHTML('beforeend', insertPost(result));

    postName.value = '';
    categoryName.value = '';
    img.value = '';
    description.value = '';
  }
});

// ручка для удаления продукта
myPosts.addEventListener('click', async (event) => {
  event.preventDefault();

  if (event.target.id === 'delete') {
    const targetDiv = event.target.closest('.posts');
    const id = event.target.closest('div').dataset.dataid;
    const response = await fetch(`/delete/${id}`, {
      method: 'delete',
    });

    if (response.ok) {
      targetDiv.remove();
    }
    // ручка для изменения поста
  } else if (event.target.id === 'edit') {
    const { editPost } = document.forms;
    const editId = event.target.parentNode.dataset.id;
    const editPosts = Object.fromEntries(new FormData(editPost));
    const res = await fetch(`/edit/${editId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editPosts),
    });

    const result = await res.json();
    console.log(result, 'frontend ------>>>');

    if (res.ok) {
      document.querySelector('.title-post').innerText = `Название поста: ${editPosts.postName}`;
      document.querySelector('.category-post').innerText = `Категория поста: ${editPosts.categoryName}`;
      document.querySelector('.img-post').src = editPosts.img;
      document.querySelector('.description-post').innerText = `Описание поста: ${editPosts.description}`;
    }
  }
});

// SIGNUP MESSAGE
// const message = document.querySelector('.signup_message');
// function message() {

// }
// setTimeout(message, 5000);
