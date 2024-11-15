// Display cart items and calculate total cost
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = ''; // Clear existing items
  
    let total = 0;
  
    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.style.animation = 'fadeIn 0.3s ease';
  
      // Display item with image, name, and remove button
      itemElement.innerHTML = `
        <div class="item-details">
          <img src="${item.image}" alt="${item.name}">
          <h4>${item.name}</h4>
        </div>
        <p>$${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
  
      cartContainer.appendChild(itemElement);
      total += item.price; // Calculate total
    });
  
    // Update total amount
    document.getElementById('total-amount').innerText = `$${total.toFixed(2)}`;
  }
  
  // Remove item from cart with animation
  function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove item from cart array
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Update the display with a smooth fade-out effect
    displayCart();
    updateCartCount();
  }
  
  // Update the cart count in the header if there's a cart count element
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.innerText = cart.length;
    }
  }
  
  // Redirect to order confirmation page
  function placeOrder() {
    localStorage.removeItem('cart'); // Clear cart after placing order
    window.location.href = 'order-confirmation.html'; // Redirect to confirmation
  }
  
  // Initialize the cart display on page load
  window.onload = displayCart;
  