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

            cartQuantity++;
          
            cartCount.innerText = cartQuantity;

            const product = button.parentElement;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('span').innerText.replace('$', '')); 

       
            addItemToCart(productName, productPrice);
        });
    });

    checkoutBtn.addEventListener('click', function () {
        if (cartQuantity === 0) {
            alert('Please add items to the cart before checking out.');
            return;
        }
    
        const address = prompt('Please enter your address:');
    
        alert(`Total Price: $${calculateTotalPrice().toFixed(2)}\nAddress: ${address}\nPayment Method: Cash on Delivery`);
        alert('Your Order will reach you in 3 days');
        alert('Thank U For Shopping From COREO.');
    
   
        clearCart();
    
       
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

                const item = positionClick.closest('.item');
                item.remove();
       
                cartQuantity--;
            }

          
            updateCartTotal();
        }
    });

    function addItemToCart(name, price) {
       
        const existingItem = Array.from(listCartHTML.children).find(item => item.querySelector('.name').innerText === name);

        if (existingItem) {
   
            const quantityElement = existingItem.querySelector('.quantity span');
            let quantity = parseInt(quantityElement.innerText);

     
            if (!isNaN(quantity)) {
                quantityElement.innerText = quantity + 1;
            }
        } else {

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

         
            newItem.style.border = '1px solid #ccc'; 
            newItem.style.padding = '10px';

            listCartHTML.appendChild(newItem);
        }

       
        updateCartTotal();
    }

    function updateCartTotal() {
      
        const totalQuantity = Array.from(listCartHTML.children).reduce((total, item) => {
            const quantityElement = item.querySelector('.quantity span');
            const quantity = parseInt(quantityElement.innerText);
            
            if (!isNaN(quantity)) {
                return total + quantity;
            }
            return total;
        }, 0);

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
       
        Array.from(listCartHTML.children).forEach(item => item.remove());
    }
    
});
