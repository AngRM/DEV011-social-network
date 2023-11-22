/* eslint-disable no-console */
import { loginUser } from '../lib/auth';

// file login.js
function login(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('login-background');
  const whiteBackground = document.createElement('div');
  whiteBackground.classList.add('white-background'); // Agrega una clase al div
  whiteBackground.style.zIndex = '0'; // Asegura que el fondo blanco esté por encima del fondo colorido
  const titleLogin = document.createElement('h2');
  titleLogin.classList.add('titleLogin');
  const subTitleLogin = document.createElement('h3');
  subTitleLogin.classList.add('subTitleLogin');

  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('buttonReturn');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');
  buttonLogin.classList.add('buttonlogin');
  const forgetPass = document.createElement('p');
  const sectionNewUser = document.createElement('section');
  const newUser = document.createElement('p');
  newUser.classList.add('inline-text'); // Agrega una clase a los elementos de texto
  const buttonNewUser = document.createElement('button');
  buttonNewUser.classList.add('create-account-button');
  const headerTextContainer = document.createElement('div');
  const headerText = document.createElement('div');
  /// ///////////////////////////////////////////////////
  const errorText = document.createElement('p');
  errorText.textContent = 'Error al ingresar a tu cuenta, revisa que tu correo y contraseña sean correctos';
  /// ///////////////////////////////////////////////////
  headerText.textContent = 'El verdadero sabor de nuestra tierra...';
  headerText.classList.add('header-text'); // Agrega una clase al div
  headerTextContainer.appendChild(headerText);

  inputEmail.placeholder = 'Ingresa correo';
  inputPass.placeholder = 'Contraseña';
  inputPass.type = 'password';

  titleLogin.textContent = 'Acceso';
  subTitleLogin.textContent = 'Inicia sesión para continuar';
  buttonLogin.textContent = 'Iniciar sesión';
  forgetPass.textContent = '¿Olvidaste tu contraseña?';
  // Recordar agregarle funcionalidad al boton de olvido y crear pagina correspondiente????///
  newUser.textContent = '¿Aún no tienes cuenta?';

  buttonReturn.textContent = 'Atrás';
  buttonNewUser.textContent = 'Create una nueva';

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
        /// ///////////////////////////////////////////////////
        form.append(errorText);
        // eslint-disable-next-line no-console
        console.log(' o no error');
        /// ///////////////////////////////////////////////////s
        console.log(errorCode, errorMessage);
      });
  });
  // Agregar el fondo blanco al elemento de la sección
  section.appendChild(whiteBackground);
  form.append(inputEmail, inputPass, forgetPass, buttonLogin);
  sectionNewUser.append(newUser, buttonNewUser);
  section.append(
    headerTextContainer,
    titleLogin,
    subTitleLogin,
    form,
    buttonReturn,
    sectionNewUser,
  );
  return section;
}
// eliminameeee
export default login;
