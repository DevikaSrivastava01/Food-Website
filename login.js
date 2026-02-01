// ==========================================================
// 🔐 SIMPLE LOGIN SCRIPT WITH REDIRECT FIX
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.querySelector('input[name="remember"]');

  if (!loginForm) return;

  // ==========================================================
  // 📋 FORM SUBMISSION
  // ==========================================================
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const remember = rememberCheckbox.checked;

    if (!email) {
      showNotification('Please enter your email', 'error');
      emailInput.focus();
      return;
    }

    if (!validateEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      emailInput.focus();
      return;
    }

    if (!password) {
      showNotification('Please enter your password', 'error');
      passwordInput.focus();
      return;
    }

    if (password.length < 6) {
      showNotification('Password must be at least 6 characters', 'error');
      passwordInput.focus();
      return;
    }

    showNotification('Logging in...', 'info');

    // Simulate login
    setTimeout(() => {
      showNotification('Login successful! Redirecting...', 'success');

      // ✅ Store login status
      if (remember) {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        sessionStorage.setItem('isLoggedIn', 'true');
      }

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }, 1000);
  });

  // ==========================================================
  // ✉️ EMAIL VALIDATION
  // ==========================================================
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // ==========================================================
  // 📢 NOTIFICATION SYSTEM
  // ==========================================================
  function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
    `;

    if (!document.querySelector('#notificationStyles')) {
      const style = document.createElement('style');
      style.id = 'notificationStyles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(400px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ==========================================================
  // 🔐 PASSWORD TOGGLE
  // ==========================================================
  function addPasswordToggle() {
    const passwordGroup = passwordInput.parentElement;
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'password-toggle';
    toggleBtn.innerHTML = '<i class="ri-eye-line"></i>';
    toggleBtn.style.cssText = `
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #667eea;
      font-size: 20px;
      cursor: pointer;
      padding: 5px;
    `;
    passwordGroup.style.position = 'relative';
    passwordGroup.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', function () {
      const icon = this.querySelector('i');
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.className = 'ri-eye-off-line';
      } else {
        passwordInput.type = 'password';
        icon.className = 'ri-eye-line';
      }
    });
  }
  addPasswordToggle();

  // ==========================================================
  // 🌐 SOCIAL LOGIN
  // ==========================================================
  const googleBtn = document.querySelector('.btn_google');
  const facebookBtn = document.querySelector('.btn_facebook');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showNotification('Google login coming soon!', 'info');
    });
  }

  if (facebookBtn) {
    facebookBtn.addEventListener('click', () => {
      showNotification('Facebook login coming soon!', 'info');
    });
  }

  // ==========================================================
  // 🔄 FORGOT PASSWORD
  // ==========================================================
  const forgotPasswordLink = document.querySelector('.forgot_password');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', e => {
      e.preventDefault();
      showNotification('Password reset link will be sent to your email', 'info');
    });
  }

  // ==========================================================
  // ⌨️ ENTER KEY NAVIGATION
  // ==========================================================
  emailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      loginForm.dispatchEvent(new Event('submit'));
    }
  });

  console.log('✅ Login page initialized successfully!');
});
