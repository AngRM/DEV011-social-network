import { registerNewUser, storeUserInfo } from '../lib/auth';
// file register.js
function register(navigateTo) {
  // const whiteBackground1 = document.createElement("div");
  // whiteBackground1.classList.add("white-background"); // Agrega una clase al div
  // whiteBackground1.style.zIndex = "0"; // Asegura que el fondo blanco e
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const subTitle = document.createElement('h3');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputCountry = document.createElement('input');
  const inputRegion = document.createElement('input');
  const inputPass = document.createElement('input');
  const inputPassConfirm = document.createElement('input');
  const buttonRegister = document.createElement('button');
  const whiteBackground1 = document.createElement('div');

  whiteBackground1.classList.add('white-background1'); // Agrega una clase al div
  whiteBackground1.style.zIndex = '0'; // Asegura que el fo
  section.classList.add('login-background');
  inputName.classList.add('inputRegister');
  inputEmail.classList.add('inputRegister');
  inputCountry.classList.add('inputRegister');
  inputRegion.classList.add('inputRegister');
  inputPass.classList.add('inputRegister');
  inputPassConfirm.classList.add('inputRegister');
  buttonReturn.classList.add('buttonReturnRegister');
  buttonRegister.classList.add('buttonRegisterRegister');

  inputName.placeholder = 'Nombre y Apellido';
  inputEmail.placeholder = 'Correo electrónico';
  inputCountry.placeholder = 'Pais';
  inputRegion.placeholder = 'Región';
  inputPass.placeholder = 'Crea una contraseña';
  inputPass.type = 'password';
  inputPassConfirm.placeholder = 'Confirma tu contraseña';
  inputPassConfirm.type = 'password';

  title.textContent = 'Registro';
  subTitle.textContent = 'Ingresa los siguientes datos:';
  buttonRegister.textContent = 'Registrate';
  buttonReturn.textContent = 'Atrás';

  buttonRegister.addEventListener('click', (event) => {
    event.preventDefault();
    // Validar que las contraseñas coincidan
    if (inputPass.value !== inputPassConfirm.value) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    // Registrar el usuario en Firebase Authentication
    registerNewUser(inputEmail.value, inputPass.value)
      .then((userCredential) => {
        // El usuario se ha registrado exitosamente
        const user = userCredential.user;
        console.log('Usuario registrado: ', user);

        // Aquí puedes guardar información adicional del usuario en Firestore si es necesario
        const userInfo = {
          name: inputName.value,
          country: inputCountry.value,
          region: inputRegion.value,
          uid: user.uid,
          // ...otros campos
        };

        // Guardar información adicional del usuario en Firestore
        storeUserInfo(userInfo)
          .then(() => {
            console.log(
              'Información adicional del usuario almacenada en Firestore',
            );
            
          })
          .catch((error) => {
            console.error(
              'Error al almacenar información adicional del usuario en Firestore: ',
              error,
            );
          });
          // Redirigir al usuario al 'wall'
          navigateTo('/wall');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error al registrar usuario: ', errorCode, errorMessage);
      });
  });

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });
  section.appendChild(whiteBackground1);

  form.append(
    inputName,
    inputCountry,
    inputRegion,
    inputEmail,
    inputPass,
    inputPassConfirm,
    buttonRegister,
    buttonReturn,
  );

  section.append(title, subTitle, form);

  return section;
}

export default register;
