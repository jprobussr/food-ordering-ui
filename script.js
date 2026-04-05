const favoriteButtons = document.querySelectorAll('.favorite-btn');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cart = [];

const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

const cartToggleBtn = document.querySelector('.cart-toggle-btn');
const cartModal = document.querySelector('.cart-modal');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart-btn');
const cartModalTotal = document.getElementById('cartModalTotal');
const cartItemsContainer = document.querySelector('.cart-items');

const renderCartItems = () => {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is empty.</p>';
    return;
  }

  const cartItemsHTML = cart
    .map((item) => {
      return `
      <article class="cart-item">
        <div>
          <h3 class="cart-item-title">${item.name}</h3>
          <p class="cart-item-price">${item.price.toFixed(2)}</p>
        </div>
      </article>
    `;
    })
    .join('');

    cartItemsContainer.innerHTML = cartItemsHTML;
};

cartOverlay.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

cartToggleBtn.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
});

const updateCartSummary = () => {
  cartCount.textContent = cart.length;

  const total = cart.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  cartTotal.textContent = total.toFixed(2);
  cartModalTotal.textContent = total.toFixed(2);

  renderCartItems();
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
    updateCartSummary();
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
