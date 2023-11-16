/**
 * @jest-environment jsdom
 */
import home from '../src/templates/home.js';

describe('home', () => {
  test('have a button', () => {
    const DOM = document.createElement('div');
    DOM.append(home());
    const haveAButton = DOM.querySelector('.botonesHomeG');
    expect(haveAButton).not.toBe(undefined);
  });
  test('after click button return call function navigateTo', () => {
    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(home(navigateTo));
    const buttonLogin = DOM.querySelector('.botonesHome');
    buttonLogin.click();
    expect(navigateTo).toHaveBeenCalledTimes(1);
  });
});
