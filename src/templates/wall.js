// Importa la función para agregar nuevos posts
import { addNewPost, listenForPosts } from '../lib/store';

function createPostElement(postData) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  const authorElement = document.createElement('p');
  authorElement.textContent = `Author: ${postData.author}`;

  const contentElement = document.createElement('p');
  contentElement.textContent = `Content: ${postData.content}`;

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

  const dataUser = `
    <dl itemscope itemtype='user'>
      <dt>Nombre:</dt><dd itemprop='name'>María</dd>
      <dt>Región:</dt><dd itemprop='region'>Cali</dd>
      <dt>País:</dt><dd itemprop='country'>Colombia</dd>
    </dl>`;

  title.textContent = 'Muro';
  buttonPost.textContent = 'Publicar';
  sectionUser.innerHTML = dataUser;

  section.append(title, sectionUser, newPostForm, postArea, buttonPost);
  console.log('botón ', buttonPost);

  buttonPost.addEventListener('click', (event) => {
    event.preventDefault();
    const content = postArea.value.trim();
    if (content) {
      // Agregar el nuevo post a Firestore
      console.log('contenido nuevo');
      addNewPost('María', content);
    } else {
      console.log('error');
    }
  });

  listenForPosts((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });

  // const unsubscribe = listenForPosts((posts) => {
  //   postsContainer.innerHTML = '';
  //   posts.forEach((postData) => {
  //     const postElement = createPostElement(postData);
  //     postsContainer.appendChild(postElement);
  //   });
  // });

  sectionPosts.append(postsContainer);
  return section;
}
