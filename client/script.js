document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    const cartBtn = document.getElementById('cart-btn');
    const closecartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const modal = document.getElementById('checkout-modal');
    const closeModalBtn = document.querySelector('.close');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const checkoutForm = document.getElementById('checkout-form');
    const contactForm = document.getElementById('contactForm');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const notificationEl = document.getElementById('notification');
    const placeOrderBtn = document.getElementById('place-order');

    // Cart data
    let cart = [];

    // Open cart sidebar
    cartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('open');
    });

    // Close cart sidebar
    closecartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
    });

    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            const imgSrc = this.closest('.product-card').querySelector('img').getAttribute('src');
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.id === id);
            if(existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    imgSrc,
                    quantity: 1
                });
            }
            
            updateCart();
            showNotification(`${name} added to cart!`);
        });
    });

    // Buy now
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            const imgSrc = this.closest('.product-card').querySelector('img').getAttribute('src');
            
            // Clear cart and add only this item
            cart = [{
                id,
                name,
                price,
                imgSrc,
                quantity: 1
            }];
            
            updateCart();
            openCheckoutModal();
        });
    });

    // Update cart display
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        cartItems.innerHTML = '';
        if(cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.imgSrc}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3 id="productName">${item.name}</h3>
                        <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</p>
                        <div class="cart-item-actions">
                            <div class="cart-item-quantity">
                                <button class="decrease-quantity" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="increase-quantity" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-item" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Add event listeners to cart item buttons
            addCartItemEventListeners();
        }
        
        // Update cart total
        const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
    }

    // Add event listeners to cart item buttons
    function addCartItemEventListeners() {
        // Increase quantity
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                item.quantity++;
                updateCart();
            });
        });
        
        // Decrease quantity
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                if(item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
                updateCart();
            });
        });
        
        // Remove item
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }

    // Show notification
    function showNotification(message, isError = false) {
        notificationEl.textContent = message;
        notificationEl.classList.add('show');
        if(isError) {
            notificationEl.classList.add('error');
        } else {
            notificationEl.classList.remove('error');
        }
        
        setTimeout(() => {
            notificationEl.classList.remove('show');
        }, 3000);
    }

    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if(cart.length === 0) {
            showNotification('Your cart is empty!', true);
            return;
        }
        
        openCheckoutModal();
    });

    // Open checkout modal
    function openCheckoutModal() {
        // Update checkout items
        checkoutItems.innerHTML = '';
        cart.forEach(item => {
            const checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkout-item');
            checkoutItem.innerHTML = `
                <div class="checkout-item-image">
                    <img src="${item.imgSrc}" alt="${item.name}">
                </div>
                <div class="checkout-item-details">
                    <h3 id="productName">${item.name}</h3>
                    <p class="checkout-item-price">₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</p>
                </div>
            `;
            checkoutItems.appendChild(checkoutItem);
        });
        
        // Update checkout total
        const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        checkoutTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
        
        // Show modal
        modal.style.display = 'block';
    }

    // Close checkout modal
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if(event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Place order
    placeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if(validateForm('checkout-form')) {
            // Collect delivery information
            const deliveryInfo = {
                name: document.getElementById('checkout-name').value,
                address: document.getElementById('checkout-address').value,
                city: document.getElementById('checkout-city').value,
                state: document.getElementById('checkout-state').value,
                zip: document.getElementById('checkout-zip').value,
                phone: document.getElementById('checkout-phone').value,
                paymentMethod: document.querySelector('input[name="payment"]:checked').value
            };
            
            // Store order details in sessionStorage
            sessionStorage.setItem('orderData', JSON.stringify({
                timestamp: new Date().toISOString(),
                total: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
            }));
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            sessionStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
            
            // Redirect to confirmation page (HTML file)
            window.location.href = 'order-confirmation.html';
        } else {
            showNotification('Please fill all required fields!', true);
        }
    });

    // Contact form submission
    contactForm && contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if(validateForm('contactForm')) {
            showNotification('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            showNotification('Please fill all required fields!', true);
        }
    });

    // Validate form
    function validateForm(formId) {
        const form = document.getElementById(formId);
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if(!input.value.trim()) {
                input.style.borderColor = 'var(--error-color)';
                isValid = false;
            } else {
                input.style.borderColor = 'var(--border-color)';
            }
        });
        
        return isValid;
    }

    // Filter products
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if(filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`nav a[href="#${sectionId}"]`) &&
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`nav a[href="#${sectionId}"]`) &&
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    });
});
