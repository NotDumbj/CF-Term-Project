document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const cartIcon = document.querySelector('.add_to_cart');
    const cartCount = document.querySelector('.add_to_cart span');
    const cartTab = document.querySelector('.cart-tab');
    const closeBtn = document.querySelector('.close');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const listCartHTML = document.querySelector('.cart-tab .listCart');

    let cartQuantity = 0;

    const checkoutBtn = document.querySelector('.checkout');

    checkoutBtn.addEventListener('click', function () {
        // Calculate the total price
        const totalPrice = calculateTotalPrice();

        // Get the address (you may replace this with your own logic to get the address)
        const address = prompt('Please enter your address:');

        // Display a modal or alert with the total price, address, and payment method
        const paymentMethod = 'Cash on Delivery'; // You can change this if you have other payment methods
        alert(`Total Price: $${totalPrice.toFixed(2)}\nAddress: ${address}\nPayment Method: ${paymentMethod}`);
        alert(`Your Order will reach u in 3 days`)
        alert(`Thank U For Shopping From COREO.`);
    });



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

    listCartHTML.addEventListener('click', function (event) {
        const positionClick = event.target;
    
        if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
            const quantityElement = positionClick.parentElement.querySelector('span');
            let quantity = parseInt(quantityElement.innerText);
    
            if (positionClick.classList.contains('plus')) {
                quantity++;
            } else {
                quantity = Math.max(quantity - 1, 0); // Ensure quantity doesn't go below 0
            }
    
            quantityElement.innerText = quantity;
    
            if (quantity === 0) {
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
    

    function calculateTotalPrice() {
        // Calculate the total price by summing up individual prices considering their quantities
        const total = Array.from(listCartHTML.children).reduce((totalPrice, item) => {
            const quantityElement = item.querySelector('.quantity span');
            const quantity = parseInt(quantityElement.innerText);

            if (!isNaN(quantity)) {
                const priceElement = item.querySelector('.totalprice');
                const price = parseFloat(priceElement.innerText.replace('$', ''));

                if (!isNaN(price)) {
                    return totalPrice + quantity * price;
                }
            }

            return totalPrice;
        }, 0);

        return total;
    }




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
        cartCount.innerText = totalQuantity;
    }
});

