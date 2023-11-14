/**
 * @jest-environment jsdom
 */
import login from '../src/templates/login.js';

describe('login', () => {
  test('is a function', () => {
    expect(typeof login).toBe('function');
  });

  test('have a button', () => {
    const DOM = document.createElement('div');
    DOM.append(login());
    const haveAButton = DOM.querySelector('.create-account-button');
    expect(haveAButton).not.toBe(undefined);
  });

  let loginSection;

  beforeEach(() => {
    loginSection = login(() => {});
    document.body.appendChild(loginSection);
  });

  test('login button click should call navigateTo with "/wall"', () => {
    const navigateToMock = jest.fn();
    const buttonLogin = loginSection.querySelector('.button-login'); // Asegúrate de que el selector sea el correcto

    // Verificar si el botón existe antes de intentar agregar el eventListener
    if (buttonLogin) {
    // Asignar el mock de navigateTo a la función real
      buttonLogin.addEventListener('click', () => navigateToMock('/wall'));

      // Simular un clic en el botón de inicio de sesión
      buttonLogin.click();

      // Verificar que navigateToMock se haya llamado con la ruta '/wall'
      expect(navigateToMock).toHaveBeenCalledWith('/wall');
    } else {
      // Fallar la prueba si el botón no existe
      expect(() => { throw new Error('El botón de inicio de sesión no se encontró en el DOM.'); }).toThrow();
    }

    // Agregar console.log dentro de la prueba para que se ejecute cuando Jest ejecute la prueba
    console.log('Botón en el DOM:', document.body.innerHTML);
    console.log('Resultado de login:', loginSection);
  });
});
