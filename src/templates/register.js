import { registerNewUser, storeUserInfo } from '../lib/auth';
// file register.js
function register(navigateTo) {
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
  const sectionRebozo2 = document.createElement('section');
  const sectionRebozo3 = document.createElement('section');

  section.classList.add('formRegister');
  inputName.classList.add('inputRegister');
  inputEmail.classList.add('inputRegister');
  inputCountry.classList.add('inputRegister');
  inputRegion.classList.add('inputRegister');
  inputPass.classList.add('inputRegister');
  inputPassConfirm.classList.add('inputRegister');
  buttonReturn.classList.add('buttonReturnRegister');
  buttonRegister.classList.add('buttonRegisterRegister');
  sectionRebozo2.classList.add('sectionRebozo2');
  sectionRebozo3.classList.add('sectionRebozo3');

  inputName.placeholder = 'Nombre y Apellido';
  inputEmail.placeholder = 'Correo electrónico';
  inputCountry.placeholder = 'Pais';
  inputRegion.placeholder = 'Región';
  inputPass.placeholder = 'Crea una contraseña';
  inputPassConfirm.placeholder = 'Confirma tu contraseña';

  title.textContent = 'Registro';
  subTitle.textContent = 'Ingresa los siguientes datos:';
  buttonRegister.textContent = 'Registrate';
  buttonReturn.textContent = 'Atrás';

  buttonRegister.addEventListener('click', () => {
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
            // Redirigir al usuario al 'wall'
            navigateTo('/wall');
          })
          .catch((error) => {
            console.error(
              'Error al almacenar información adicional del usuario en Firestore: ',
              error,
            );
          });
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

  form.append(inputName, inputCountry, inputRegion, inputEmail, inputPass, inputPassConfirm);
  section.append(sectionRebozo2, title, subTitle, form, buttonRegister, buttonReturn);
  sectionRebozo2.append();
  sectionRebozo3.append();
  return section;
}

export default register;
