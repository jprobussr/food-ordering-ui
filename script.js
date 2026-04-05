const favoriteButtons = document.querySelectorAll('.favorite-btn');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartToggleBtn = document.querySelector('.cart-toggle-btn');
const cartModal = document.querySelector('.cart-modal');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart-btn');
const cartModalTotal = document.getElementById('cartModalTotal');
const cartItemsContainer = document.querySelector('.cart-items');
const homeView = document.querySelector('.home-view');
const profileView = document.querySelector('.profile-view');
const homeNavBtn = document.querySelector('.home-nav-btn');
const profileNavBtn = document.querySelector('.profile-nav-btn');

const cart = [];

const showHomeView = () => {
  homeView.classList.remove('hidden');
  profileView.classList.add('hidden');

  homeNavBtn.classList.add('active');
  profileNavBtn.classList.remove('active');
}

const showProfileView = () => {
  homeView.classList.add('hidden');
  profileView.classList.remove('hidden');

  profileNavBtn.classList.add('active');
  homeNavBtn.classList.remove('active');
}

homeNavBtn.addEventListener('click', showHomeView);
profileNavBtn.addEventListener('click', showProfileView);

const renderCartItems = () => {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is empty.</p>';
    return;
  }

  const cartItemsHTML = cart
    .map((item, index) => {
      return `
      <article class="cart-item">
        <div>
          <h3 class="cart-item-title">${item.name}</h3>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        </div>

        <button class="remove-item-btn" data-index="${index}" type="button">X</button>
      </article>
    `;
    })
    .join('');

  cartItemsContainer.innerHTML = cartItemsHTML;

  const removeItemButtons = document.querySelectorAll('.remove-item-btn');

  removeItemButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const itemIndex = Number(button.dataset.index);

      cart.splice(itemIndex, 1);
      updateCartSummary();
    });
  });
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

showHomeView();