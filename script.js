const favoriteButtons = document.querySelectorAll('.favorite-btn');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cart = [];

const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

const updateCartSummary = () => {
  cartCount.textContent = cart.length;

  const total = cart.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  cartTotal.textContent = total.toFixed(2);
};

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const itemName = button.dataset.name;
    const itemPrice = Number(button.dataset.price);

    const item = {
      name: itemName,
      price: itemPrice,
    };

    cart.push(item);
    updateCartSummary()
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
