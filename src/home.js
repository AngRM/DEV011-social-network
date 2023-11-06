import { loginGoogle } from './lib';

// file home.js
function home(navigateTo) {
  const section = document.createElement('section');
  const sectionRebozoHome = document.createElement('section');
  const sectionForm = document.createElement('section');
  const divLogo = document.createElement('div');
  const imgLogo = document.createElement('img');
  const title = document.createElement('p');
  const buttonLogin = document.createElement('button');
  const buttonGoogle = document.createElement('button');
  const buttonRegister = document.createElement('button');

  sectionRebozoHome.classList.add('homeRebozo');
  sectionForm.classList.add('formHome');
  divLogo.classList.add('logo');

  const Logo = `<img id='imgLogo' src=img/Logo.png width='200px' heigth='200px'>`;
  divLogo.innerHTML = Logo;
  buttonLogin.textContent = 'Iniciar sesión';
  buttonGoogle.textContent = 'Iniciar sesión con Google';
  buttonRegister.textContent = 'Crear cuenta';

  buttonLogin.addEventListener('click', () => navigateTo('/login'));
  buttonRegister.addEventListener('click', () => navigateTo('/register'));
  buttonGoogle.addEventListener('click', () => {
    loginGoogle().then(() => navigateTo('/wall'));
  });
  title.textContent = 'El verdadero sabor de nuestra tierra';

  sectionRebozoHome.append(title, divLogo);
  sectionForm.append(buttonLogin, buttonGoogle, buttonRegister);
  section.append(sectionRebozoHome, sectionForm);

  return section;
}

export default home;
