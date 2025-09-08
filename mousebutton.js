const button = document.querySelectorAll('.button');

button.addEventListener('mouseover', () => {
  button.style.transform = 'scale(1.2)';
  button.style.transition = 'transform 0.3s';
});
button.addEventListener('mouseout', () => {
  button.style.transform = 'scale(1)';
});
button.addEventListener('click', () => {
  alert('Tu as cliqué sur le bouton !');
});