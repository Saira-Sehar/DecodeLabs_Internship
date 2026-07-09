// ========== PRODUCT DATABASE ==========
const allProducts = [
    { id: 1, category: 'electronics', title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 248.00, original: 349.99, discount: 29, rating: 4.5, reviews: '2.4k', sold: '1.2k', shipping: 'Free Shipping', badge: 'hot', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 2, category: 'electronics', title: 'Apple Watch Series 9 GPS + Cellular 45mm', price: 429.00, original: 499.00, discount: 14, rating: 5, reviews: '5.8k', sold: '3.4k', shipping: 'Free Shipping', badge: 'new', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 3, category: 'fashion', title: 'Nike Air Max 270 React Men\'s Running Shoes', price: 89.99, original: 150.00, discount: 40, rating: 4, reviews: '1.8k', sold: '5.6k', shipping: 'Free Shipping', badge: 'sale', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 4, category: 'electronics', title: 'Canon EOS R6 Mark II Mirrorless Camera Body', price: 2499.00, original: 2799.00, discount: 11, rating: 4.5, reviews: '890', sold: '234', shipping: 'Free Shipping', badge: null, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 5, category: 'gaming', title: 'PlayStation 5 Digital Edition Console', price: 449.00, original: 499.00, discount: 10, rating: 5, reviews: '12.3k', sold: '8.9k', shipping: 'Free Shipping', badge: 'hot', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 6, category: 'electronics', title: 'MacBook Pro 16" M3 Pro Chip 18GB RAM 512GB', price: 2399.00, original: 2499.00, discount: 4, rating: 5, reviews: '3.2k', sold: '567', shipping: 'Free Shipping', badge: 'new', image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 7, category: 'fashion', title: 'Ray-Ban Aviator Classic Gold Frame Sunglasses', price: 153.00, original: 180.00, discount: 15, rating: 4, reviews: '4.1k', sold: '2.1k', shipping: '+$5.99 shipping', badge: null, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 8, category: 'home', title: 'Ergonomic Office Chair with Lumbar Support', price: 199.99, original: 349.99, discount: 43, rating: 4.5, reviews: '6.7k', sold: '4.3k', shipping: 'Free Shipping', badge: 'sale', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 9, category: 'sports', title: 'Fitbit Charge 6 Fitness Tracker with Heart Rate', price: 159.95, original: 179.95, discount: 11, rating: 4.5, reviews: '3.2k', sold: '1.8k', shipping: 'Free Shipping', badge: 'new', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 10, category: 'home', title: 'Dyson V15 Detect Cordless Vacuum Cleaner', price: 649.99, original: 749.99, discount: 13, rating: 5, reviews: '4.7k', sold: '2.3k', shipping: 'Free Shipping', badge: 'hot', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 11, category: 'fashion', title: 'Levi\'s 501 Original Fit Men\'s Jeans', price: 49.99, original: 79.99, discount: 38, rating: 4, reviews: '8.3k', sold: '12.4k', shipping: 'Free Shipping', badge: 'sale', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 12, category: 'gaming', title: 'Xbox Series X 1TB Console', price: 499.00, original: 549.00, discount: 9, rating: 5, reviews: '9.1k', sold: '6.5k', shipping: 'Free Shipping', badge: null, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 13, category: 'motors', title: 'Car Phone Holder Wireless Charger Mount', price: 29.99, original: 49.99, discount: 40, rating: 4, reviews: '2.1k', sold: '4.7k', shipping: 'Free Shipping', badge: 'sale', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 14, category: 'jewelry', title: 'Sterling Silver Cubic Zirconia Tennis Bracelet', price: 89.00, original: 120.00, discount: 26, rating: 4.5, reviews: '1.5k', sold: '980', shipping: 'Free Shipping', badge: null, image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 15, category: 'books', title: 'The Complete Cooking for Two Cookbook', price: 24.99, original: 34.99, discount: 29, rating: 5, reviews: '6.2k', sold: '15.3k', shipping: 'Free Shipping', badge: 'hot', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=600&auto=format&fit=crop', wishlisted: false },
    { id: 16, category: 'sports', title: 'Yoga Mat Non-Slip Exercise Mat 6mm', price: 34.99, original: 59.99, discount: 42, rating: 4.5, reviews: '4.8k', sold: '9.2k', shipping: 'Free Shipping', badge: 'sale', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600&auto=format&fit=crop', wishlisted: false }
];

// ========== STATE ==========
let currentFilter = 'all';
let currentSort = 'default';
let cart = [];
let wishlist = [];
let displayCount = 8;

// ========== DOM ELEMENTS ==========
const productsGrid = document.getElementById('productsGrid');
const productSectionTitle = document.getElementById('productSectionTitle');
const productCount = document.getElementById('productCount');
const activeFilters = document.getElementById('activeFilters');
const filterTagText = document.getElementById('filterTagText');
const removeFilter = document.getElementById('removeFilter');
const noProducts = document.getElementById('noProducts');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartItemCount = document.getElementById('cartItemCount');
const cartTotal = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartCountTop = document.querySelector('.cart-count-top');
const watchlistCount = document.querySelector('.watchlist-count');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const logoLink = document.getElementById('logoLink');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

// ========== RENDER PRODUCTS ==========
function getFilteredProducts() {
    let filtered = [...allProducts];
    
    if (currentFilter !== 'all' && currentFilter !== 'deals') {
        filtered = filtered.filter(p => p.category === currentFilter);
    } else if (currentFilter === 'deals') {
        filtered = filtered.filter(p => p.discount >= 25);
    }
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(searchTerm) || 
            p.category.toLowerCase().includes(searchTerm)
        );
    }
    
    switch(currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'discount':
            filtered.sort((a, b) => b.discount - a.discount);
            break;
    }
    
    return filtered;
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fa-solid fa-star"></i>';
    }
    if (hasHalf) {
        stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="fa-regular fa-star"></i>';
    }
    return stars;
}

function renderProducts() {
    const filtered = getFilteredProducts();
    const displayProducts = filtered.slice(0, displayCount);
    
    productsGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        noProducts.style.display = 'block';
        loadMoreContainer.style.display = 'none';
        document.getElementById('productsGrid').style.display = 'none';
    } else {
        noProducts.style.display = 'none';
        document.getElementById('productsGrid').style.display = 'grid';
        loadMoreContainer.style.display = filtered.length > displayCount ? 'block' : 'none';
        
        displayProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy" />
                    <button class="wishlist-btn ${product.wishlisted ? 'wishlisted' : ''}" data-id="${product.id}">
                        <i class="${product.wishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        <span class="original-price">$${product.original.toFixed(2)}</span>
                        <span class="discount">-${product.discount}%</span>
                    </div>
                    <div class="product-meta">
                        <span class="shipping">${product.shipping}</span>
                        <span class="sold">${product.sold} sold</span>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    }
    
    // Update UI
    productCount.textContent = `Showing ${displayProducts.length} of ${filtered.length} products`;
    
    if (currentFilter !== 'all') {
        activeFilters.style.display = 'flex';
        const categoryNames = {
            electronics: 'Electronics', fashion: 'Fashion', home: 'Home & Garden',
            sports: 'Sports', motors: 'Motors', gaming: 'Gaming', 
            jewelry: 'Jewelry', books: 'Books', deals: 'Deals'
        };
        filterTagText.textContent = categoryNames[currentFilter] || currentFilter;
        productSectionTitle.textContent = categoryNames[currentFilter] || currentFilter;
    } else {
        activeFilters.style.display = 'none';
        productSectionTitle.textContent = searchInput.value ? `Search: "${searchInput.value}"` : 'All Products';
    }
    
    // Attach event listeners
    attachProductEvents();
}

function attachProductEvents() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            addToCart(id);
        });
    });
    
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            toggleWishlist(id);
        });
    });
}

// ========== CART FUNCTIONS ==========
function addToCart(id) {
    const product = allProducts.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification(`${product.title.substring(0, 30)}... added to cart`);
    
    // Button animation
    const btn = document.querySelector(`.add-to-cart-btn[data-id="${id}"]`);
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Added!';
        btn.style.background = '#108a00';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 1500);
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCountTop.textContent = totalItems;
    cartItemCount.textContent = totalItems;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}" />
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title.substring(0, 40)}...</div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div>Qty: ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `).join('');
        cartFooter.style.display = 'block';
        
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                removeFromCart(parseInt(this.dataset.id));
            });
        });
    }
}

function toggleWishlist(id) {
    const product = allProducts.find(p => p.id === id);
    product.wishlisted = !product.wishlisted;
    
    if (product.wishlisted) {
        wishlist.push(id);
    } else {
        wishlist = wishlist.filter(wId => wId !== id);
    }
    
    watchlistCount.textContent = wishlist.length;
    renderProducts();
}

// ========== NOTIFICATION ==========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; background: #1f2937; color: white;
        padding: 16px 24px; border-radius: 10px; font-weight: 500; z-index: 9999;
        display: flex; align-items: center; gap: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideIn 0.4s ease, slideOut 0.4s ease 2.5s forwards;
        font-family: 'Inter', sans-serif; font-size: 0.9rem;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ========== FILTER FUNCTIONS ==========
function setFilter(category) {
    currentFilter = category;
    displayCount = 8;
    renderProducts();
    
    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.nav === category) link.classList.add('active');
    });
    
    // Scroll to products
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ========== EVENT LISTENERS ==========

// Navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.dataset.nav;
        setFilter(category);
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// Category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.dataset.category;
        setFilter(category);
    });
});

// Banner button
document.querySelector('.banner-btn').addEventListener('click', function(e) {
    e.preventDefault();
    setFilter('electronics');
});

// Logo click - reset all
logoLink.addEventListener('click', function(e) {
    e.preventDefault();
    resetAll();
});

// Remove filter
removeFilter.addEventListener('click', () => {
    resetAll();
});

// Reset filters button
resetFiltersBtn.addEventListener('click', () => {
    resetAll();
});

function resetAll() {
    currentFilter = 'all';
    currentSort = 'default';
    searchInput.value = '';
    displayCount = 8;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.nav === 'all') link.classList.add('active');
    });
    sortSelect.value = 'default';
    renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sort
sortSelect.addEventListener('change', function() {
    currentSort = this.value;
    displayCount = 8;
    renderProducts();
});

// Search
searchBtn.addEventListener('click', () => {
    displayCount = 8;
    renderProducts();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        displayCount = 8;
        renderProducts();
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }
});

// Load more
loadMoreBtn.addEventListener('click', () => {
    displayCount += 8;
    renderProducts();
});

// Cart sidebar
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    document.body.classList.add('cart-open');
    updateCartUI();
});

cartClose.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    document.body.classList.remove('cart-open');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    document.body.classList.remove('cart-open');
});

// Mobile nav
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Back to top
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Newsletter form
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Subscribed to newsletter successfully!');
    this.reset();
});

// ========== INITIAL RENDER ==========
renderProducts();
updateCartUI();

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(120px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(120px); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('%c eBay Clone %c All Systems Active %c Ready for Demo',
    'color: #e43137; font-size: 1.5rem; font-weight: bold;',
    'color: #0654ba; font-size: 1rem;',
    'color: #108a00; font-size: 0.9rem;'
);