import { loginUser } from '../lib/auth';

// file login.js
function login(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const subTitle = document.createElement('h3');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const forgetPass = document.createElement('p');
  const sectionNewUser = document.createElement('section');
  const newUser = document.createElement('p');
  const buttonNewUser = document.createElement('button');

  inputEmail.placeholder = 'Ingresa correo';
  inputPass.placeholder = 'Contraseña';

  title.textContent = 'Acceso';
  subTitle.textContent = 'Inicia sesión para continuar';
  buttonLogin.textContent = 'Iniciar sesión';
  forgetPass.textContent = '¿Olvidaste tu contraseña?';
  newUser.textContent = '¿Aún no tienes cuenta?';

  buttonReturn.textContent = 'Atrás';
  buttonNewUser.textContent = 'Créate una nueva cuenta';

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });
  buttonNewUser.addEventListener('click', () => navigateTo('/register'));
  buttonLogin.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('clickkkkkk');
    loginUser(inputEmail.value, inputPass.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigateTo('/wall');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });
  form.append(inputEmail, inputPass, forgetPass, buttonLogin);
  sectionNewUser.append(newUser, buttonNewUser);
  section.append(title, subTitle, form, buttonReturn, sectionNewUser);

  return section;
}

export default login;