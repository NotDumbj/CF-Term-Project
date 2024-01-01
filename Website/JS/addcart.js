document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const cartIcon = document.querySelector('.add_to_cart');
    const cartCount = document.querySelector('.add_to_cart span');
    const cartTab = document.querySelector('.cart-tab');
    const closeBtn = document.querySelector('.close');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const listCartHTML = document.querySelector('.cart-tab .listCart');
    const checkoutBtn = document.querySelector('.checkout');


    let cartQuantity = 0;

    cartIcon.addEventListener('click', function () {
        body.classList.toggle('showcart');
        cartTab.classList.toggle('showcart');
    });

    closeBtn.addEventListener('click', function () {
        body.classList.remove('showcart');
        cartTab.classList.remove('showcart');
    });

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Increment the cart quantity
            cartQuantity++;
            // Update the cart count in the icon
            cartCount.innerText = cartQuantity;

            // Get product details
            const product = button.parentElement;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('span').innerText.replace('$', '')); // Convert to a floating-point number

            // Add or update item in the cart
            addItemToCart(productName, productPrice);
        });
    });

    checkoutBtn.addEventListener('click', function () {
        if (cartQuantity === 0) {
            alert('Please add items to the cart before checking out.');
            return;
        }
    
        // Prompt the user for address input
        const address = prompt('Please enter your address:');
    
        // Display alert boxes with the provided address and payment method
        alert(`Total Price: $${calculateTotalPrice().toFixed(2)}\nAddress: ${address}\nPayment Method: Cash on Delivery`);
        alert('Your Order will reach you in 3 days');
        alert('Thank U For Shopping From COREO.');
    
        // Remove items from the cart
        clearCart();
    
        // Update the cart count in the icon
        cartQuantity = 0;
        cartCount.innerText = cartQuantity;
    });
    

    listCartHTML.addEventListener('click', function (event) {
        const positionClick = event.target;

        if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
            const quantityElement = positionClick.parentElement.querySelector('span');
            let quantity = parseInt(quantityElement.innerText);

            if (positionClick.classList.contains('plus')) {
                quantity++;
            } else {
                quantity = Math.max(quantity - 1, 0);
            }

            quantityElement.innerText = quantity;

            if (quantity === 0 && positionClick.classList.contains('minus')) {
                // Remove the item from the cart
                const item = positionClick.closest('.item');
                item.remove();
                // Decrement the cart quantity
                cartQuantity--;
            }

            // Update the total quantity in the cart
            updateCartTotal();
        }
    });

    function addItemToCart(name, price) {
        // Check if the item already exists in the cart
        const existingItem = Array.from(listCartHTML.children).find(item => item.querySelector('.name').innerText === name);

        if (existingItem) {
            // Item already exists, update the quantity
            const quantityElement = existingItem.querySelector('.quantity span');
            let quantity = parseInt(quantityElement.innerText);

            // Check if quantity is a valid number
            if (!isNaN(quantity)) {
                quantityElement.innerText = quantity + 1;
            }
        } else {
            // Item does not exist, create a new item in the cart
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = `
                <div class="name">${name}</div>
                <div class="totalprice">$${price.toFixed(2)}</div>
                <div class="quantity">
                    <button class="minus">-</button>
                    <span>1</span>
                    <button class="plus">+</button>
                </div>
            `;

            // Apply CSS styles
            newItem.style.border = '1px solid #ccc'; // Example style, you can customize this
            newItem.style.padding = '10px'; // Example style, you can customize this

            listCartHTML.appendChild(newItem);
        }

        // Update the total quantity in the cart
        updateCartTotal();
    }

    function updateCartTotal() {
        // Calculate the total quantity by summing up individual quantities
        const totalQuantity = Array.from(listCartHTML.children).reduce((total, item) => {
            const quantityElement = item.querySelector('.quantity span');
            const quantity = parseInt(quantityElement.innerText);
            // Check if quantity is a valid number
            if (!isNaN(quantity)) {
                return total + quantity;
            }
            return total;
        }, 0);

        // Update the cart count in the icon
        cartQuantity = totalQuantity;
        cartCount.innerText = cartQuantity;
    }

    function calculateTotalPrice() {
        // Calculate the total price by summing up individual item prices
        const totalPrice = Array.from(listCartHTML.children).reduce((total, item) => {
            const quantityElement = item.querySelector('.quantity span');
            const quantity = parseInt(quantityElement.innerText);
            const priceElement = item.querySelector('.totalprice');
            const price = parseFloat(priceElement.innerText.replace('$', ''));

            // Check if quantity and price are valid numbers
            if (!isNaN(quantity) && !isNaN(price)) {
                return total + quantity * price;
            }

            return total;
        }, 0);

        return totalPrice;
    }

    function clearCart() {
        // Remove all items from the cart
        Array.from(listCartHTML.children).forEach(item => item.remove());
    }
    
});
