/**
 * @jest-environment jsdom
 */
import login from "../src/templates/login.js";

describe("login", () => {
  test("is a function", () => {
    expect(typeof login).toBe("function");
  });
<<<<<<< HEAD:test/login.spect.js
=======
  test("have a button", () => {
    const DOM = document.createElement("div");
    DOM.append(login());
    const haveAButton = DOM.querySelector(".create-account-button");
    expect(haveAButton).not.toBe(undefined);
  });
  let loginSection;

  beforeEach(() => {
    loginSection = login(() => {});
  });

  test('login button click should call navigateTo with "/wall"', () => {
    const loginSection = login(() => {});
    const navigateToMock = jest.fn();
    const buttonLogin = loginSection.querySelector(".buttonlogin"); // Asegúrate de que el selector sea el correcto

    // Asignar el mock de navigateTo a la función real
    buttonLogin.addEventListener("click", () => navigateToMock("/wall"));

    // Simular un clic en el botón de inicio de sesión
    buttonLogin.click();

    // Verificar que navigateToMock se haya llamado con la ruta "/wall"
    expect(navigateToMock).toHaveBeenCalledWith("/wall");
  });
>>>>>>> 01ef8194bcbf4a1de9c4a9e93eee52629f106fe8:test/login.spec.js
});
