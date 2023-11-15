import { auth } from '../lib/firebase';
import { addNewPost, listenForPosts } from '../lib/store';

function createPostElement(postData) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  const authorElement = document.createElement('p');
  authorElement.textContent = `${postData.author}`;

  const contentElement = document.createElement('p');
  contentElement.textContent = `${postData.content}`;

  postElement.appendChild(authorElement);
  postElement.appendChild(contentElement);

  return postElement;
}

export default function wall() {
  const title = document.createElement('h2');
  const section = document.createElement('section');
  const sectionUser = document.createElement('section');
  const newPostForm = document.createElement('form');
  const postArea = document.createElement('textarea');
  const buttonPost = document.createElement('button');
  const sectionPosts = document.createElement('section');
  const postsContainer = document.createElement('div');

  section.classList.add('backgroundWall');
  sectionUser.classList.add('sectionUser');
  newPostForm.classList.add('post');
  postArea.classList.add('postArea');
  buttonPost.classList.add('buttonPost');
  buttonPost.setAttribute('type', 'submit');
  sectionPosts.classList.add('sectionPosts');
  postsContainer.classList.add('postsCont');
  postArea.placeholder = 'Escribe una nueva publicación...';
  postsContainer.id = 'postcon';

  const dataUser = `
    <dl itemscope itemtype='user'>
      <dt>Nombre:</dt><dd itemprop='name'>María</dd>
      <dt>Región:</dt><dd itemprop='region'>Cali</dd>
      <dt>País:</dt><dd itemprop='country'>Colombia</dd>
    </dl>`;

  title.textContent = 'Muro';
  buttonPost.textContent = 'Publicar';
  sectionUser.innerHTML = dataUser;

  newPostForm.append(postArea, buttonPost);

  section.append(title, sectionUser, newPostForm, sectionPosts);
  console.log('botón ', buttonPost);

  buttonPost.addEventListener('click', (event) => {
    event.preventDefault();
    const userActual = auth.currentUser;
    const validateUser = userActual !== null ? userActual.displayName : 'user';
    const content = postArea.value.trim();
    if (content) {
      // Agregar el nuevo post a Firestore
      console.log('contenido nuevo');
      addNewPost(validateUser, content);

      // Limpiar el área de texto después de agregar el post
      postArea.value = '';
    } else {
      console.log('error');
    }
  });

  listenForPosts((querySnapshot) => {
    postsContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      const postElement = createPostElement(postData);
      postsContainer.append(postElement);
    });
  });

  sectionPosts.append(postsContainer);
  return section;
}
