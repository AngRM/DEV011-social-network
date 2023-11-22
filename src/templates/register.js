import { registerNewUser, storeUserInfo } from '../lib/auth';
// file register.js
function register(navigateTo) {
  // const whiteBackground1 = document.createElement("div");
  // whiteBackground1.classList.add("white-background"); // Agrega una clase al div
  // whiteBackground1.style.zIndex = "0"; // Asegura que el fondo blanco e
  const section = document.createElement('section');
  const titleRegister = document.createElement('h2');
  const subTitleRegister = document.createElement('h3');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const labelName = document.createElement('label');
  const inputName = document.createElement('input');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const labelCountry = document.createElement('label');
  const inputCountry = document.createElement('input');
  const labelRegion = document.createElement('label');
  const inputRegion = document.createElement('input');
  const labelPass = document.createElement('label');
  const inputPass = document.createElement('input');
  const labelPassConfirm = document.createElement('label');
  const inputPassConfirm = document.createElement('input');
  const buttonRegister = document.createElement('button');
  const whiteBackground1 = document.createElement('div');

  whiteBackground1.classList.add('white-background1'); // Agrega una clase al div
  whiteBackground1.style.zIndex = '0'; // Asegura que el fo
  section.classList.add('login-background');
  titleRegister.classList.add('titleRegister');
  subTitleRegister.classList.add('subTitleRegister');
  labelName.classList.add('labelsRegister');
  inputName.classList.add('inputRegister');
  labelEmail.classList.add('labelsRegister');
  inputEmail.classList.add('inputRegister');
  inputCountry.classList.add('inputRegister');
  labelCountry.classList.add('labelsRegister');
  labelRegion.classList.add('labelsRegister');
  inputRegion.classList.add('inputRegister');
  labelPass.classList.add('labelsRegister');
  inputPass.classList.add('inputRegister');
  labelPassConfirm.classList.add('labelsRegister');
  inputPassConfirm.classList.add('inputRegister');
  buttonReturn.classList.add('buttonReturnRegister');
  buttonRegister.classList.add('buttonRegisterRegister');

  labelName.textContent = 'Nombre y apellido:';
  labelEmail.textContent = 'Correo electrónico:';
  labelRegion.textContent = 'Región:';
  labelCountry.textContent = 'País:';
  labelPass.textContent = 'Contraseña:';
  labelPassConfirm.textContent = 'Confirma contraseña:';

  inputName.placeholder = 'Ejemplo: Alexis Pescoran ';
  inputEmail.placeholder = 'Ejemplo: AleP@gmail.com';
  inputCountry.placeholder = 'Ejemplo: Perú';
  inputRegion.placeholder = 'Ejemplo: Lima';
  inputPass.placeholder = 'Ejemplo:Lab-DEV011';
  inputPass.type = 'password';
  inputPassConfirm.placeholder = 'Ejemplo:Lab-DEV011';
  inputPassConfirm.type = 'password';

  titleRegister.textContent = 'Registro';
  subTitleRegister.textContent = 'Ingresa los siguientes datos';
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
    labelName,
    inputName,
    labelCountry,
    inputCountry,
    labelRegion,
    inputRegion,
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    labelPassConfirm,
    inputPassConfirm,
    buttonRegister,
    buttonReturn,
  );

  section.append(titleRegister, subTitleRegister, form);

  return section;
}

export default register;
