let renderData = document.querySelector(".renderData");
let renderData2 = document.querySelector(".renderData2");
let quantity = document.querySelector(".quantity");

let cart = [];
let total_bill = 0;
let total_items = 0;

let cartpage = document.querySelector('.cart-page');
document.querySelector('#cart-btn').onclick = () => {
    cartpage.classList.toggle('active');
};

function updateBillDisplay() {
    const existingBillDisplay = document.querySelector(".billdisplay");
    if (existingBillDisplay) {
        existingBillDisplay.remove();
    }

    let billDisplay = document.createElement("div");
    billDisplay.setAttribute("class", "billdisplay");

    let checkOut = document.createElement("div");
    checkOut.setAttribute("class", "check-out");
    checkOut.textContent = "Checkout";

    let sum = document.createElement("div");
    sum.setAttribute("class", "sum");
    sum.textContent = `Total: ₹${total_bill}`;

    billDisplay.appendChild(sum);
    billDisplay.appendChild(checkOut);

    cartpage.appendChild(billDisplay);
}

function renderCartItems() {
    // Clear previous items before re-rendering
    const cartItems = document.querySelectorAll('.displayproduct');
    cartItems.forEach(item => item.remove());

    cart.forEach(item => {
        let displayProduct = document.createElement("div");
        displayProduct.setAttribute("class", "displayproduct");

        let displayImage = document.createElement("img");
        displayImage.setAttribute("src", item.image);
        displayImage.setAttribute("class", "imgsize");

        let displayName = document.createElement("div");
        displayName.textContent = `${item.name}`;

        let displayPrice = document.createElement("div");
        displayPrice.textContent = `₹${item.price}`;

        let inc_dec = document.createElement("div");
        inc_dec.setAttribute("class", "inc-dec");

        let button1 = document.createElement("button");
        button1.setAttribute("class", "buttons");
        button1.textContent = "+";

        let counter = document.createElement("div");
        counter.setAttribute("class", "counter");
        counter.textContent = item.quantity;

        let button2 = document.createElement("button");
        button2.setAttribute("class", "buttons");
        button2.textContent = "-";

        button1.addEventListener("click", () => {
            incrementItem(item.id);
        });

        button2.addEventListener("click", () => {
            decrementItem(item.id);
        });

        inc_dec.appendChild(button1);
        inc_dec.appendChild(counter);
        inc_dec.appendChild(button2);

        displayProduct.appendChild(displayImage);
        displayProduct.appendChild(displayName);
        displayProduct.appendChild(displayPrice);
        displayProduct.appendChild(inc_dec);

        cartpage.appendChild(displayProduct);
    });
}

function incrementItem(itemId) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity++;
        total_bill += item.price;
        total_items++;
        quantity.textContent = total_items;
        renderCartItems();
        updateBillDisplay();
    }
}

function decrementItem(itemId) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
        total_bill -= item.price;
        total_items--;
        quantity.textContent = total_items;
        renderCartItems();
        updateBillDisplay();
    } else if (item && item.quantity === 1) {
        cart = cart.filter(cartItem => cartItem.id !== itemId);
        total_bill -= item.price;
        total_items--;
        quantity.textContent = total_items;
        renderCartItems();
        updateBillDisplay();
    }
}

function addtoCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        // Increment quantity if item is already in the cart
        existingItem.quantity++;
    } else {
        // Add new item to the cart
        cart.push({ ...item, quantity: 1 });
    }

    total_bill += item.price;
    total_items++;
    quantity.textContent = total_items;

    // Re-render cart items
    renderCartItems();
    updateBillDisplay();
}

async function getData() {
    const res = await fetch("json/products1.json");
    const data = await res.json();

    data.map((ele) => {
        let productCard = document.createElement("div");
        productCard.setAttribute("class", "product-card");

        let set = document.createElement("div");
        set.setAttribute("class", "set");

        let createImageEle = document.createElement("img");
        createImageEle.setAttribute("src", ele.image);
        createImageEle.setAttribute("class", "images");
        productCard.appendChild(createImageEle);

        let createNameEle = document.createElement("div");
        createNameEle.setAttribute("class", "name-tag");
        createNameEle.textContent = ` ${ele.name}`;
        productCard.appendChild(createNameEle);

        let createPriceEle = document.createElement("span");
        createPriceEle.setAttribute("class", "price-tag");
        createPriceEle.textContent = `Price: ₹${ele.price}`;
        set.appendChild(createPriceEle);

        let createQuantityEle = document.createElement("span");
        createQuantityEle.setAttribute("class", "quantity-tag");
        createQuantityEle.textContent = `quantity: ${ele.quantity}`;
        productCard.appendChild(createQuantityEle);

        let btnEle = document.createElement("button");
        btnEle.setAttribute("class", "add-to-cart-btn");
        btnEle.textContent = "Add to cart";
        set.appendChild(btnEle);
        productCard.appendChild(set);

        btnEle.addEventListener("click", () => addtoCart({ id: ele.id, image: ele.image, name: ele.name, price: ele.price }));

        renderData.appendChild(productCard);
    });
}

async function getData2() {
    const res = await fetch("json/products2.json");
    const data = await res.json();

    data.map((ele) => {
        let productCard = document.createElement("div");
        productCard.setAttribute("class", "product-card");

        let set = document.createElement("div");
        set.setAttribute("class", "set");

        let createImageEle = document.createElement("img");
        createImageEle.setAttribute("src", ele.image);
        createImageEle.setAttribute("class", "images");
        productCard.appendChild(createImageEle);

        let createNameEle = document.createElement("div");
        createNameEle.setAttribute("class", "name-tag");
        createNameEle.textContent = `${ele.name}`;
        productCard.appendChild(createNameEle);

        let createPriceEle = document.createElement("span");
        createPriceEle.setAttribute("class", "price-tag");
        createPriceEle.textContent = `Price: ₹${ele.price}`;
        set.appendChild(createPriceEle);

        let createQuantityEle = document.createElement("span");
        createQuantityEle.setAttribute("class", "quantity-tag");
        createQuantityEle.textContent = `quantity: ${ele.quantity}`;
        productCard.appendChild(createQuantityEle);

        let btnEle = document.createElement("button");
        btnEle.setAttribute("class", "add-to-cart-btn");
        btnEle.textContent = "Add to cart";
        set.appendChild(btnEle);
        productCard.appendChild(set);

        btnEle.addEventListener("click", () => addtoCart({ id: ele.id, image: ele.image, name: ele.name, price: ele.price }));

        renderData2.appendChild(productCard);
    });
}

getData();
getData2();
