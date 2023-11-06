function wall(navigateTo) {
  const title = document.createElement('h2');
  const section = document.createElement('section');
  section.classList.add('backgroundWall');
  title.textContent = 'Muro';
  section.append(title);
  return section;
}
export default wall;
