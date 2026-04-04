const favoriteButtons = document.querySelectorAll('.favorite-btn');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cart = [];

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const itemName = button.dataset.name;
    const itemPrice = Number(button.dataset.price);

    const item = {
      name: itemName,
      price: itemPrice,
    };

    cart.push(item);
    console.log(cart);
  });
});

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
