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

    // Declarar errorElement antes del buttonLogin.addEventListener
    const errorElement = document.createElement("div");
    errorElement.style.color = "red"; // Establece el color del texto en rojo
    errorElement.textContent =
      "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.";
    errorElement.style.display = "none"; // Inicialmente oculto

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });
  buttonNewUser.addEventListener('click', () => navigateTo('/register'));
  buttonLogin.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('clickkkkkk');
    // Reiniciar el mensaje de error al hacer clic en el botón de inicio de sesión
    errorElement.style.display = 'none';
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
          // Mostrar el mensaje de error solo si la autenticación falla
          if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
            errorElement.style.display = 'block';
          }
        });
    });
  form.append(inputEmail, inputPass, forgetPass, buttonLogin);
   // elemento de error
   form.appendChild(errorElement);
  sectionNewUser.append(newUser, buttonNewUser);
  section.append(title, subTitle, form, buttonReturn, sectionNewUser);

  return section;
}

export default login;
