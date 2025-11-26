// ===== PRODUITS =====
const products = {
  baeri: {
    id: 'baeri',
    name: 'Baeri Signature',
    description: 'Perles fines raffinées, saveur iodée délicate et élégante.',
    note: 'Perles fines raffinées, saveur iodée délicate.',
    image: 'https://images.unsplash.com/photo-1625937329935-a67ed30f92a4?w=600&auto=format&fit=crop&q=80',
    category: 'Esturgeon Baeri',
    ribbon: 'Best-seller',
    ribbon_class: 'ribbon-gold',
    meta: 'Import direct premium',
    formats: ['30g', '50g', '125g'],
    prices: {
      '30g': 245000,
      '50g': 395000,
      '125g': 875000
    },
    price_from: 245000
  },
  oscietre: {
    id: 'oscietre',
    name: 'Osciètre Royal',
    description: 'Notes de noisette prononcées, longueur en bouche exceptionnelle.',
    note: 'Notes de noisette, longueur exceptionnelle.',
    image: 'https://images.unsplash.com/photo-1535473895227-bdecb20fb157?w=600&auto=format&fit=crop&q=80',
    category: 'Esturgeon Osciètre',
    ribbon: 'Favori chefs',
    ribbon_class: '',
    meta: 'Import direct premium',
    formats: ['30g', '50g', '125g'],
    prices: {
      '30g': 345000,
      '50g': 545000,
      '125g': 1250000
    },
    price_from: 345000
  },
  beluga: {
    id: 'beluga',
    name: 'Beluga Réserve',
    description: 'Texture beurrée ultra-premium, caviar rare et d\'exception.',
    note: 'Texture beurrée ultra-premium, rare.',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=600&auto=format&fit=crop&q=80',
    category: 'Esturgeon Beluga',
    ribbon: 'Édition rare',
    ribbon_class: 'ribbon-rare',
    meta: 'Import direct premium',
    formats: ['30g', '50g', '125g'],
    prices: {
      '30g': 600000,
      '50g': 975000,
      '125g': 2250000
    },
    price_from: 600000
  }
};

// ===== PANIER (CART) SYSTEM =====
let cart = JSON.parse(localStorage.getItem('caviarCart')) || [];

// Mettre à jour le compteur du panier
function updateCartCount() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  let badge = document.querySelector('.cart-badge');
  
  if (!badge && cartCount > 0) {
    badge = document.createElement('span');
    badge.className = 'cart-badge';
    document.querySelector('.nav-cta').appendChild(badge);
  }
  
  if (badge) {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? 'flex' : 'none';
    
    // Animation du badge
    badge.style.animation = 'none';
    setTimeout(() => badge.style.animation = 'cartBadgePop 0.4s ease', 10);
  }
}

// Ajouter au panier
function addToCart(productId, size) {
  const product = products[productId];
  const existingItem = cart.find(item => item.id === productId && item.size === size);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      size: size,
      price: product.prices[size],
      image: product.image,
      quantity: 1
    });
  }
  
  localStorage.setItem('caviarCart', JSON.stringify(cart));
  updateCartCount();
  showNotification(`${product.name} (${size}) ajouté au panier`);
  
  // Animation de l'icône panier
  const cartBtn = document.querySelector('.nav-cta');
  cartBtn.style.animation = 'cartShake 0.5s ease';
  setTimeout(() => cartBtn.style.animation = '', 500);
}

// Notification toast
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===== MODAL FICHE PRODUIT =====
function openProductModal(productId) {
  const product = products[productId];
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('productModalContent');
  
  const badges = {
    'best-seller': `<div class="ribbon ribbon-gold">${product.ribbon}</div>`,
    'favori-chefs': `<div class="ribbon">${product.ribbon}</div>`,
    'edition-rare': `<div class="ribbon ribbon-rare">${product.ribbon}</div>`
  };
  
  const features = [
    'Origine contrôlée et traçable',
    'Import direct premium',
    'Livraison express Madagascar'
  ];
  
  modalContent.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 12px;">
        ${badges[product.category] || ''}
      </div>
      <div class="product-detail-info">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--gold); margin-bottom: 1rem;">
          ${product.name}
        </h2>
        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; color: var(--text-muted);">
          ${product.description}
        </p>
        
        <div class="size-selector" style="margin-bottom: 2rem;">
          <h3 style="font-size: 1rem; margin-bottom: 1rem; color: var(--gold);">Choisissez votre format</h3>
          <div class="size-options">
            ${Object.entries(product.prices).map(([size, price]) => `
              <button class="size-option" onclick="selectSize('${productId}', '${size}', ${price})" data-size="${size}">
                <div class="size-label">${size}</div>
                <div class="size-price">${price.toLocaleString('fr-FR')} Ar</div>
              </button>
            `).join('')}
          </div>
        </div>
        
        <div class="product-features">
          ${features.map((feature, index) => `
            <div class="feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${index === 0 ? '<path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>' : 
                  index === 1 ? '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' :
                  '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'}
              </svg>
              ${feature}
            </div>
          `).join('')}
            </svg>
            Conservation 0-4°C
          </div>
          <div class="feature-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            Livraison sécurisée Madagascar
          </div>
        </div>
        
        <button class="btn btn-primary btn-large" style="width: 100%; margin-top: 2rem; padding: 1rem;" 
                onclick="addToCartFromModal('${productId}')" id="addToCartBtn">
          Sélectionnez un format
        </button>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Animation d'entrée
  setTimeout(() => {
    modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.4s ease-out';
  }, 10);
}

let selectedProductSize = null;
let selectedProductId = null;

function selectSize(productId, size, price) {
  selectedProductId = productId;
  selectedProductSize = size;
  
  // Enlever la sélection précédente
  document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('selected'));
  
  // Ajouter la sélection actuelle
  event.target.closest('.size-option').classList.add('selected');
  
  // Mettre à jour le bouton
  const addBtn = document.getElementById('addToCartBtn');
  addBtn.textContent = `Ajouter au panier - ${price.toLocaleString('fr-FR')} Ar`;
  addBtn.style.animation = 'pulse 0.3s ease';
}

function addToCartFromModal(productId) {
  if (!selectedProductSize) {
    showNotification('Veuillez sélectionner un format', 'warning');
    return;
  }
  
  addToCart(selectedProductId, selectedProductSize);
  closeProductModal();
  
  // Réinitialiser la sélection
  selectedProductSize = null;
  selectedProductId = null;
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  modal.querySelector('.modal-content').style.animation = 'modalSlideOut 0.3s ease-in';
  
  setTimeout(() => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }, 300);
}

// ===== MODAL PANIER =====
function openCart() {
  const modal = document.getElementById('cartModal');
  const cartContent = document.getElementById('cartContent');
  
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-cart">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.3; margin-bottom: 1rem;">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <h3>Votre panier est vide</h3>
        <p>Découvrez notre sélection de caviars d'exception</p>
        <button class="btn btn-primary" onclick="closeCart()" style="margin-top: 1.5rem;">
          Découvrir nos caviars
        </button>
      </div>
    `;
  } else {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartContent.innerHTML = `
      <div class="cart-items">
        ${cart.map((item, index) => `
          <div class="cart-item" style="animation: slideIn 0.3s ease ${index * 0.1}s both;">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p class="cart-item-size">${item.size}</p>
              <p class="cart-item-price">${item.price.toLocaleString('fr-FR')} Ar</p>
            </div>
            <div class="cart-item-actions">
              <div class="quantity-controls">
                <button onclick="updateQuantity(${index}, -1)" class="qty-btn">-</button>
                <span class="qty-display">${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)" class="qty-btn">+</button>
              </div>
              <button onclick="removeFromCart(${index})" class="btn-remove" title="Retirer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="cart-summary">
        <div class="cart-total">
          <span>Total</span>
          <span class="total-price">${total.toLocaleString('fr-FR')} Ar</span>
        </div>
        <button class="btn btn-primary btn-large" onclick="proceedToOrder()" style="width: 100%; margin-top: 1rem;">
          Passer commande
        </button>
        <button class="btn btn-outline" onclick="closeCart()" style="width: 100%; margin-top: 0.5rem;">
          Continuer mes achats
        </button>
      </div>
    `;
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.4s ease-out';
  }, 10);
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    localStorage.setItem('caviarCart', JSON.stringify(cart));
    updateCartCount();
    openCart(); // Refresh cart display
  }
}

function removeFromCart(index) {
  const item = cart[index];
  cart.splice(index, 1);
  localStorage.setItem('caviarCart', JSON.stringify(cart));
  updateCartCount();
  showNotification(`${item.name} retiré du panier`);
  openCart(); // Refresh cart display
}

function closeCart() {
  const modal = document.getElementById('cartModal');
  modal.querySelector('.modal-content').style.animation = 'modalSlideOut 0.3s ease-in';
  
  setTimeout(() => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }, 300);
}

// ===== MODAL COMMANDE =====
function proceedToOrder() {
  closeCart();
  
  setTimeout(() => {
    const modal = document.getElementById('orderModal');
    const orderContent = document.getElementById('orderContent');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const fraisLivraison = 10000;
    const totalFinal = total + fraisLivraison;
    
    orderContent.innerHTML = `
      <div class="order-form">
        <div class="order-summary-box">
          <h3>Récapitulatif</h3>
          ${cart.map(item => `
            <div class="order-item">
              <span>${item.name} (${item.size}) x${item.quantity}</span>
              <span>${(item.price * item.quantity).toLocaleString('fr-FR')} Ar</span>
            </div>
          `).join('')}
          <div class="order-item">
            <span>Frais de livraison</span>
            <span>${fraisLivraison.toLocaleString('fr-FR')} Ar</span>
          </div>
          <div class="order-total-line">
            <strong>Total</strong>
            <strong style="color: var(--gold);">${totalFinal.toLocaleString('fr-FR')} Ar</strong>
          </div>
        </div>
        
        <form onsubmit="submitOrder(event)" class="checkout-form">
          <h3>Informations de livraison</h3>
          
          <div class="form-group">
            <label>Nom complet</label>
            <input type="text" required placeholder="Votre nom">
          </div>
          
          <div class="form-group">
            <label>Email</label>
            <input type="email" required placeholder="votre@email.com">
          </div>
          
          <div class="form-group">
            <label>Téléphone</label>
            <input type="tel" required placeholder="+261 XX XX XXX XX">
          </div>
          
          <div class="form-group">
            <label>Adresse de livraison</label>
            <textarea required rows="3" placeholder="Adresse complète"></textarea>
          </div>
          
          <div class="form-group">
            <label>Ville</label>
            <select required>
              <option value="">Choisir une ville</option>
              <option value="antananarivo">Antananarivo</option>
              <option value="antsirabe">Antsirabe</option>
              <option value="toamasina">Toamasina</option>
              <option value="mahajanga">Mahajanga</option>
              <option value="toliara">Toliara</option>
              <option value="fianarantsoa">Fianarantsoa</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Instructions spéciales (optionnel)</label>
            <textarea rows="2" placeholder="Instructions de livraison"></textarea>
          </div>
          
          <div class="payment-info">
            <h3>Mode de paiement</h3>
            <div class="payment-option">
              <input type="radio" id="cash" name="payment" value="cash" checked>
              <label for="cash">
                <strong>Espèces à la livraison</strong>
                <span>Paiement en Ariary au livreur</span>
              </label>
            </div>
            <div class="payment-option">
              <input type="radio" id="transfer" name="payment" value="transfer">
              <label for="transfer">
                <strong>Virement bancaire</strong>
                <span>Coordonnées envoyées par email</span>
              </label>
            </div>
            <div class="payment-option">
              <input type="radio" id="mobile" name="payment" value="mobile">
              <label for="mobile">
                <strong>Mobile Money</strong>
                <span>MVola, Orange Money, Airtel Money</span>
              </label>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary btn-large" style="width: 100%; margin-top: 2rem; font-size: 1.1rem;">
            Confirmer la commande - ${totalFinal.toLocaleString('fr-FR')} Ar
          </button>
        </form>
      </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.4s ease-out';
    }, 10);
  }, 350);
}

function submitOrder(event) {
  event.preventDefault();
  
  // Animation de chargement
  const btn = event.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.innerHTML = '<span class="spinner"></span> Traitement en cours...';
  btn.disabled = true;
  
  // Simuler l'envoi de commande
  setTimeout(() => {
    // Vider le panier
    cart = [];
    localStorage.setItem('caviarCart', JSON.stringify(cart));
    updateCartCount();
    
    // Afficher confirmation
    const orderContent = document.getElementById('orderContent');
    orderContent.innerHTML = `
      <div class="order-success">
        <div class="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h2>Commande confirmée !</h2>
        <p>Merci pour votre commande. Nous vous contacterons sous peu pour confirmer la livraison.</p>
        <p class="order-number">Numéro de commande : <strong>#CV${Date.now().toString().slice(-6)}</strong></p>
        
        <div class="next-steps">
          <h3>Prochaines étapes</h3>
          <ul>
            <li>Vous recevrez un email de confirmation</li>
            <li>Notre équipe vous contactera dans les 24h</li>
            <li>Livraison express à Antananarivo</li>
            <li>Guide de dégustation inclus</li>
          </ul>
        </div>
        
        <button class="btn btn-primary" onclick="closeOrder()" style="margin-top: 2rem;">
          Retour à l'accueil
        </button>
      </div>
    `;
    
    // Confettis animation
    createConfetti();
    
  }, 2000);
}

function closeOrder() {
  const modal = document.getElementById('orderModal');
  modal.querySelector('.modal-content').style.animation = 'modalSlideOut 0.3s ease-in';
  
  setTimeout(() => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }, 300);
}

// Animation confettis
function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.backgroundColor = ['#D4AF37', '#4A90E2', '#F4E5B8'][Math.floor(Math.random() * 3)];
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 4000);
  }
}

// Initialiser le compteur au chargement
updateCartCount();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      
      // Add stagger effect for children
      const children = entry.target.querySelectorAll('.product-card, .service-card, .pill, .badge-item');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Add fadeInUp animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Interactive card tilt effect
document.querySelectorAll('.product-card, .hero__card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Animated counter for ratings
const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toFixed(1);
      clearInterval(timer);
    } else {
      element.textContent = current.toFixed(1);
    }
  }, 20);
};

// Trigger counter animation when visible
const ratingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const ratingText = entry.target.textContent;
      const match = ratingText.match(/(\d+\.?\d*)/);
      if (match) {
        const targetRating = parseFloat(match[1]);
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target, targetRating);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stars').forEach(star => {
  ratingObserver.observe(star);
});

// Parallax effect for floating bubbles
let scrollY = 0;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  
  document.querySelectorAll('.float-bubble').forEach((bubble, index) => {
    const speed = 0.3 + (index * 0.1);
    bubble.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleEffect 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Filter chips interaction
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', function() {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    
    // Add a bounce animation
    this.style.animation = 'chipBounce 0.4s ease';
    setTimeout(() => {
      this.style.animation = '';
    }, 400);
  });
});

// Add chip bounce animation
const chipStyle = document.createElement('style');
chipStyle.textContent = `
  @keyframes chipBounce {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
document.head.appendChild(chipStyle);

// Lazy load effect for images (if you add images later)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add sparkle effect on hover for special elements
document.querySelectorAll('.hero__label, .ribbon').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.animation = 'sparkleShine 0.6s ease-in-out';
  });
  
  element.addEventListener('animationend', function() {
    this.style.animation = '';
  });
});

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkleShine {
    0%, 100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.3);
    }
  }
`;
document.head.appendChild(sparkleStyle);

// Initialiser le compteur du panier au chargement
updateCartCount();

console.log('%c🐟 Maison Caviar — Site de luxe créé avec ❤️', 'color: #D4AF37; font-size: 14px; font-weight: bold;');
