// Cart Management Class
class Cart {
    constructor() {
        this.cartItems = [];
        this.cartBadge = document.getElementById("cart-count");
        this.sideCartItems = document.getElementById('side-cart-items');
        this.cartTotal = document.getElementById('side-cart-total');
        this.initializeEvents();
    }

    initializeEvents() {
        // Attach add to cart event listeners
        const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
        addToCartButtons.forEach((button) =>
            button.addEventListener("click", (e) => this.addToCart(e))
        );
    }

    // Add item to cart
    addToCart(event) {
        const button = event.target;
        const item = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image,  // image URL
            quantity: 1,  // initialize quantity to 1
        };

        // Check if the item is already in the cart
        const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            // Item already in cart, increase the quantity
            this.cartItems[existingItemIndex].quantity += 1;
        } else {
            // Add new item to the cart
            this.cartItems.push(item);
        }

        this.updateCartBadge();
        this.updateSideCart();
    }

    // Update Cart Badge
    updateCartBadge() {
        this.cartBadge.textContent = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    // Update Side Cart UI
    updateSideCart() {
        this.sideCartItems.innerHTML = '';  // Clear the side cart before re-populating
        let total = 0;

        this.cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <span class="quantity">
                    <button class="quantity-btn" onclick="cart.updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="cart.updateQuantity(${index}, 1)">+</button>
                </span>
                <button class="remove-btn" onclick="cart.removeFromCart(${index})">Remove</button>
            `;
            this.sideCartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        this.cartTotal.textContent = total.toFixed(2);
    }

    // Update item quantity in the cart
    updateQuantity(index, delta) {
        const item = this.cartItems[index];
        item.quantity = Math.max(1, item.quantity + delta);  // Ensure quantity doesn't go below 1
        this.updateSideCart();
    }

    // Remove item from cart
    removeFromCart(index) {
        this.cartItems.splice(index, 1);
        this.updateSideCart();
        this.updateCartBadge();
    }
}

// Toggle Side Cart Visibility
function toggleCart() {
    const sideCart = document.getElementById('side-cart');
    sideCart.classList.toggle('active');
}

// Main Execution
document.addEventListener("DOMContentLoaded", () => {
    window.cart = new Cart();  // Store Cart instance in window to allow global access
});
