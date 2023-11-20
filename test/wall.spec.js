/**
 * @jest-environment jsdom
 */
import wall from '../src/templates/wall.js';

describe('wall function', () => {
  test('should create a section element with specific child elements', () => {
    // Preparacion
    const navigateToMock = jest.fn(); // Mock de la función navigateTo

    // Actuar
    const result = wall(navigateToMock);

    // Elemento section
    expect(result.tagName).toBe('SECTION');

    // Elementos hijos
    expect(result.querySelector('h2')).not.toBeNull();
    expect(result.querySelector('.button-close')).not.toBeNull();
    expect(result.querySelector('.sectionUser')).not.toBeNull();

    // Comportamiento de eventos o funciones
    const closeButton = result.querySelector('.button-close');
    closeButton.click();
    expect(navigateToMock).toHaveBeenCalledWith('/home');
  });
});
