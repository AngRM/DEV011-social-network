import { loginGoogle } from '../lib/auth.js';

// file home.js
function home(navigateTo) {
  const section = document.createElement('section');
  const sectionRebozoHome = document.createElement('section');
  const sectionForm = document.createElement('section');
  const divLogo = document.createElement('div');
  // const imgLogo = document.createElement('img');
  const title = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const buttonGoogle = document.createElement('button');
  const buttonRegister = document.createElement('button');
  sectionRebozoHome.classList.add('homeRebozo');
  sectionForm.classList.add('formHome');
  divLogo.classList.add('logo');
  title.classList.add('slogan');
  buttonLogin.classList.add('botonesHome');
  buttonGoogle.classList.add('botonesHome');
  buttonRegister.classList.add('botonesHome');

  const Logo = '<img id=\'imgLogo\' src=img/Logo.png width=\'200px\' heigth=\'200px\'>';
  divLogo.innerHTML = Logo;
  buttonLogin.textContent = 'Iniciar sesión';
  buttonGoogle.textContent = 'Con Google';
  buttonRegister.textContent = 'Crear cuenta';

  buttonLogin.addEventListener('click', () => navigateTo('/login'));
  buttonRegister.addEventListener('click', () => navigateTo('/register'));
  buttonGoogle.addEventListener('click', () => {
    loginGoogle()
      .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        navigateTo('/wall');
        return user;
      // ...
      })
      .catch((error) => {
      // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        // ...
        console.log('errores: ', errorCode, errorMessage, email);
        return error;
      });
  });
  title.textContent = 'El verdadero sabor de nuestra tierra';

  sectionRebozoHome.append(divLogo);
  sectionForm.append(title, buttonLogin, buttonGoogle, buttonRegister);
  section.append(sectionRebozoHome, sectionForm);

  return section;
}

export default home;
