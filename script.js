const favoriteButtons = document.querySelectorAll('.favorite-btn');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');

  const isLight = document.body.classList.contains('light');

  if (isLight) {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '🌙';
  }
});

favoriteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});
