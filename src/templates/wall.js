import { doc } from "firebase/firestore";

function wall(navigateTo) {
  const title = document.createElement('h2');
  const section = document.createElement('section');
  const sectionUser=document.createElement('section');
  const postSection=document.createElement('input');
  const buttonPost=document.createElement('button');
  
  section.classList.add('backgroundWall');
  sectionUser.classList.add('sectionUser');
  postSection.classList.add('postSection');
  buttonPost.classList.add('buttonPost');

  const dataUser =`
    <dl itemscope itemtype="user">
      <dt>Nombre:</dt><dd itemprop="name">María</dd>
      <dt>Región:</dt><dd itemprop="region">Cali</dd>
      <dt>País:</dt><dd itemprop="country">Colombia</dd>
    </dl>`;

  title.textContent = 'Muro';
  buttonPost.textContent='Publicar'
  sectionUser.innerHTML=dataUser;
  section.append(title,sectionUser,postSection,buttonPost);
  return section;
}
export default wall;