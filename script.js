// ==========================================================
// 🏠 INDEX PAGE SCRIPT
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {
  const authGate = document.getElementById('authGate');
  const mainContent = document.getElementById('mainContent');
  const logoutBtn = document.getElementById('logoutBtn');
  const scrollBtn = document.getElementById('scroll_top');
  const menuBtn = document.getElementById('menu_btn');
  const navLinks = document.getElementById('nav_links');

  // ==========================================================
  // 🔐 LOGIN STATUS CHECK
  // ==========================================================
  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true' ||
    sessionStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    authGate.classList.add('hide');
    mainContent.classList.add('active');
  } else {
    authGate.classList.remove('hide');
    mainContent.classList.remove('active');
  }

  // ==========================================================
  // 🔓 LOGOUT FUNCTIONALITY
  // ==========================================================
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('isLoggedIn');
      window.location.reload();
    });
  }

  // ==========================================================
  // 🔝 SCROLL TO TOP BUTTON
  // ==========================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('active');
    } else {
      scrollBtn.classList.remove('active');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================================
  // 🍔 MOBILE MENU TOGGLE
  // ==========================================================
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ==========================================================
  // 🛒 ADD TO CART BUTTONS
  // ==========================================================
  const cartCount = document.getElementById('cartCount');
  const addToCartButtons = document.querySelectorAll('.add_to_cart');
  let cartItems = [];

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-id]');
      const item = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: card.dataset.price
      };

      cartItems.push(item);
localStorage.setItem('cartItems', JSON.stringify(cartItems));
cartCount.textContent = cartItems.length;


      button.innerHTML = '<i class="ri-check-line"></i> Added';
      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = '<i class="ri-shopping-cart-line"></i> Add to Cart';
        button.disabled = false;
      }, 2000);
    });
  });

  console.log('✅ Index page initialized successfully!');
});
