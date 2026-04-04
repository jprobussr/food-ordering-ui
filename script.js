const favoriteButtons = document.querySelectorAll('.favorite-btn');

favoriteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});
