// test de Christal xd
/**
 * @jest-environment jsdom
 */
import register from '../src/templates/register.js';

// Mockear las funciones de autenticación
jest.mock('../src/lib/auth', () => ({
  registerNewUser: jest.fn(),
  storeUserInfo: jest.fn(),
}));

describe('Register Component', () => {
  test('should call registerNewUser and storeUserInfo on successful registration', async () => {
    const navigateToMock = jest.fn();
    document.body.innerHTML = ''; // Limpiar el cuerpo del documento para cada prueba

    // Actuar
    register(navigateToMock);

    // Realizar pruebas específicas para la función `register` aquí
    console.log(document.body.innerHTML);
  });

  test('should return an HTMLDivElement or HTMLElement', () => {
    const navigateToMock = jest.fn();

    // Asegurarse de que la función devuelva un elemento del tipo HTMLDivElement o HTMLElement
    const result = register(navigateToMock);
    expect(result instanceof HTMLDivElement || result instanceof HTMLElement).toBe(true);
  });
});
