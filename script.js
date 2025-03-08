let cart = {};
let basket = JSON.parse(localStorage.getItem("basket")) || {};
//localStorage.clear()

function createPaymentModal() {
    // Check if modal already exists (prevent duplication)
    if (document.getElementById("paymentModal")) return;

    // Create modal container
    const modalContainer = document.getElementById("Viewer");
    const modal = document.createElement("div");
    modal.id = "paymentModal";
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>Vložte Platobné Údaje</h2>

            <form id="paymentForm">
                <div id = "Name_Holder">
                    <div>
                              <input type="text" id="Name" name="Name" placeholder="Meno" required>
                    </div>
                    <div>
                                <input type="text" id="Surname" name="Surname" placeholder="Priezvisko" required>
                    </div>
                <div>
                <input type="email" id="email" name="email" placeholder="E-mailová adresa" required>

                 <div id = "Adress_Holder">
                                <input type="text" id="City" name="City" placeholder="Mesto / Obec" required>
                                <input type="text" id="PSČ" name="PSČ" placeholder="PSČ"required>
                <div>

                <label for="Card_Holder_Name">Meno Držitela Karty</label>
                <input type="text" id="Card_Holder_Name" name="Card_Holder_Name" placeholder="Meno Držitela Karty"required>

                <label for="cardNumber">Číslo Karty</label>
                <input type="text" id="cardNumber" name="cardNumber" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" required>

                <div class="card-details">
                    <div>
                        <label for="expiryDate">Dátum Expirácie Karty</label>
                        <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required>
                    </div>
                    <div>
                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv" name="cvv" maxlength="3" placeholder="CVV"required>
                    </div>
                </div>

                <button class = "Submit_Button",type="submit">Zaplatiť</button>
            </form>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(modal);
    document.getElementById("paymentModal").style.display = "flex";
    // Add event listeners for formatting
    document.getElementById("cardNumber").addEventListener("input", formatCardNumber);
    document.getElementById("expiryDate").addEventListener("input", formatExpiryDate);
    document.getElementById("paymentForm").addEventListener("submit", processPayment);
}

// Function to show the modal
function openModal() {
    createPaymentModal();
    document.getElementById("paymentModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("paymentModal");
    if (modal) {
        modal.remove();
    }
}

// Format card number (add spaces every 4 digits)
function formatCardNumber(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    value = value.replace(/(.{4})/g, '$1 ').trim(); // Add space every 4 digits
    e.target.value = value;
}

// Format expiry date (MM/YY)
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    e.target.value = value;
}

// Function to calculate total price
function calculateTotal(cartItems) {
    return Object.values(cartItems).reduce(
        (sum, item) => sum + (parseFloat(item.price) * item.quantity),
        0
    ).toFixed(2);
}


async function processPayment(e) {
    e.preventDefault();

    const userDetails = {
        name: document.getElementById("Name").value,
        surname: document.getElementById("Surname").value,
        email: document.getElementById("email").value,
        city: document.getElementById("City").value,
        postalCode: document.getElementById("PSČ").value
    };

    let cartItems = JSON.parse(localStorage.getItem("basket")) || {};

    if (Object.keys(cartItems).length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const totalAmount = calculateTotal(cartItems);
    
    // Dynamic URLs based on the current website
    const websiteOrigin = window.location.origin;
    const success_url = `${websiteOrigin}/success`;
    const cancel_url = `${websiteOrigin}/cancel`;

    try {
        let response = await fetch("https://your-stripe-server.com/create-checkout-session", { // Replace with actual server URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                products: Object.values(cartItems),
                userId: userDetails.email, // Use email as a unique identifier
                success_url,
                cancel_url,
                websiteOrigin
            })
        });

        let result = await response.json();

        if (result.id) {
            window.location.href = `https://checkout.stripe.com/pay/${result.id}`;
        } else {
            alert("Payment failed: " + result.message);
        }
    } catch (error) {
        console.error("Payment Error:", error);
        alert("An error occurred while processing payment.");
    }
}

// Function to calculate total price
function calculateTotalAmount() {
    return Object.values(basket).reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
}




function basketButtonFunction()
{
    let basketData = encodeURIComponent(JSON.stringify(basket)); // Convert basket to a URL-safe string
    window.open(`basket.html?data=${basketData}`, "_blank");
};
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if (typeof products !== "undefined") {
            loadProducts("Default_Page"); // Default category on page load
            
            loadBasket(); // Load basket from local storage
            
        } else {
            console.error("Products data not loaded. Check your script order.");
        }
    }, 100);
    
});

function loadProducts(category) {
    const viewer = document.getElementById("Viewer");
    viewer.innerHTML = ""; // Clear previous products
    cart = {}; // Reset the cart so it starts fresh each time

    products[category].forEach(product => {
        cart[product.name] = 1; // Ensure each product starts at 1
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <div class="product-card">
                <p class="product-name">${product.name}</p>
                <img class="Clickable_Image" 
                     src="${product.image}" 
                     alt="${product.name}" 
                     data-name="${product.name}" 
                     data-price="${product.price}" 
                     data-imageurl="${product.image}">
                <p class="product-price">${product.price}€</p>

                <div class="quantity-container">
                    <div class="quantity-controls">
                        <button class="Button" onclick="decreaseQuantity('${product.name}')">−</button>
                        <span class="WhiteText" id="quantity-${product.name}">1</span>
                        <button class="Button" onclick="increaseQuantity('${product.name}')">+</button>
                    </div>
                    <button class="add-to-cart" onclick="addToCart('${product.name}', '${product.price}', '${product.image}')">Add to Cart</button>
                </div>
            </div>
        `;

        viewer.appendChild(productDiv);
    });

    // Add event listeners to all images after they are added to the DOM
    document.querySelectorAll(".Clickable_Image").forEach(img => {
        console.error("a");
        img.addEventListener("click", function() {
            console.error("Products data loaded.");
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            GoToProductPage(productName, productPrice);

        });
    });
}



function GoToProductPage(productName, productPrice) {
    console.log("Product clicked:", productName);

    const viewer = document.getElementById("Viewer");
    viewer.innerHTML = ""; // Clear previous products

    let Product_Viewer = document.createElement("div");
    Product_Viewer.id = "Product_Viewer"; 
    Product_Viewer.classList.add("Product_Viewer");

    let product = Object.values(products).flat().find(p => p.name === productName);
    if (!product || !product.images || product.images.length === 0) {
        console.error("No images found for product:", productName);
        return;
    }

    currentProductImages = product.images;
    currentIndex = 0;

    let thumbnailsHTML = currentProductImages.map(img => 
        `<img class="Thumbnail" src="${img}" onclick="changeImage('${img}')">`
    ).join("");

    let productDiv = document.createElement("div");
    productDiv.classList.add("Product_Detail_Page");

    // Reset quantity when opening the product page
    cart[productName] = 1;

    productDiv.innerHTML = `
        <div class="Product_Details">
            <div class="Product_Images">
                <div class="ImageControl">               
                    <button class="ImageControlButtonPrevious" onclick="prevImage()">&#9664;</button>
                    <img id="mainImage" class="mainImage" src="${currentProductImages[currentIndex]}" alt="Product Image">
                    <button class="ImageControlButtonNext" onclick="nextImage()">&#9654;</button>
                </div>
                <div class="ThumbnailsHolder">
                    ${thumbnailsHTML}
                </div>
            </div>
            
            <div class="Product_Info">
                <h2>${productName}</h2>
                <p>Description of the product goes here...</p>
                <p><strong>Price: </strong><span id="productPrice">${productPrice}</span></p>
                <div class="ProductPageQuantityContainer">
                    <div class="Quantity_Controls_ProductPage">
                        <button class="Button" onclick="decreaseQuantity('${productName}')">−</button>
                        <span class="WhiteText" id="quantity-${productName}">1</span>
                        <button class="Button" onclick="increaseQuantity('${productName}')">+</button>
                    </div>
                    <button class="add-to-cart" onclick="addToCart('${productName}', '${productPrice}', '${currentProductImages[currentIndex]}')">Add to Cart</button>
                </div>
                <button onclick="buyNow()">Buy</button>
            </div>
        </div>
    `;

    viewer.appendChild(Product_Viewer);
    Product_Viewer.appendChild(productDiv);
}

// Function to update the displayed image
function updateImage() {
    const imageElement = document.getElementById("mainImage");
    if (imageElement) {
        imageElement.src = currentProductImages[currentIndex];
    }
}

// Function to go to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + currentProductImages.length) % currentProductImages.length;
    updateImage();
}

// Function to go to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % currentProductImages.length;
    updateImage();
}

// Function to change the image when clicking a thumbnail
function changeImage(newImage) {
    currentIndex = currentProductImages.indexOf(newImage);
    updateImage();

    // Remove 'active' class from all thumbnails
    document.querySelectorAll(".thumbnail-image").forEach(img => img.classList.remove("active"));

    // Add 'active' class to the clicked thumbnail
    document.querySelector(`.thumbnail-image[src="${newImage}"]`)?.classList.add("active");
}

function increaseQuantity(productName) {
    if (!cart[productName]) {
        cart[productName] = 1;
    }
    cart[productName] += 1;
    document.getElementById(`quantity-${productName}`).innerText = cart[productName];
}

function decreaseQuantity(productName) {
    if (!cart[productName]) {
        cart[productName] = 1;
    }
    if (cart[productName] > 1) {
        cart[productName] -= 1;
        document.getElementById(`quantity-${productName}`).innerText = cart[productName];
    }
}

function addToCart(productName, price, imageUrl) {
    let quantity = cart[productName] || 1; // Get the quantity
    cart[productName] = 1; // Reset quantity after adding to cart

    if (quantity > 0) {
        if (basket[productName]) {
            basket[productName].quantity += quantity; // Correctly increment quantity
        } else {
            basket[productName] = { name: productName, price, image: imageUrl, quantity };
        }
        localStorage.setItem("basket", JSON.stringify(basket)); // Save to local storage
        updateBasket();
        alert(`${quantity} x ${productName} added to cart!`);
    } else {
        alert("Please select at least one item.");
    }
}


function GoToCart() {
    const viewer = document.getElementById("Viewer");
    viewer.innerHTML = ""; // Clear previous products

    let Basket_Viewer = document.createElement("div");
    Basket_Viewer.id = "Basket_Viewer"; 
    Basket_Viewer.classList.add("Basket_Viewer");

    viewer.appendChild(Basket_Viewer); // Append the container to the viewer

    updateBasket(); // Now updateBasket will fill the Basket-Viewer with items
}

function updateBasket() {
    const basketContainer = document.getElementById("Basket_Viewer");
    basketContainer.innerHTML = ""; // Clear previous entries

    if (Object.keys(basket).length === 0) {
        basketContainer.innerHTML = "<p class='EmptyBasketMessage'>Košík je prázdny.</p>";
        return; // Stop further execution
    }

    let BasketTotalPrice = 0; // Initialize total price

    Object.values(basket).forEach((item) => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("Basket_Item_Container");

        let value = parseFloat(item.price.replace("$", "")); // Convert price
        let totalPrice = (value * item.quantity).toFixed(2);

        productDiv.innerHTML = `
            <div class="Basket-Item">
                <img class="Basket_Image" 
                     src="${item.image}" 
                     alt="${item.name}" 
                     data-name="${item.name}" 
                     data-price="${item.price}" 
                     data-imageurl="${item.image}">
                <div class="Item-Details">
                    <strong class="BasketText">${item.name}</strong>
                    <p class="BasketText">${item.description || ""}</p>
                    <p class="BasketText">${totalPrice}€</p>
                </div>
                <div class="Quantity-Controls-Basket">
                    <button class="BasketChangeQuantityButton" onclick="changeQuantity('${item.name}', -1)">-</button>
                    <span class="BasketChangeQuantityText">${item.quantity}</span>
                    <button class="BasketChangeQuantityButton" onclick="changeQuantity('${item.name}', 1)">+</button>
                </div>
            </div>
        `;

        basketContainer.appendChild(productDiv);
        BasketTotalPrice += value * item.quantity;
    });

    let totalSum = 0;
    let receiptDiv = document.createElement("div");
    receiptDiv.classList.add("BasketReceipt");

    let receiptContent = `<div class="Basket-Item-Pay"><table class="ReceiptTable">`;

    Object.values(basket).forEach((item) => {
        let itemPrice = parseFloat(item.price.replace("$", "")); // Convert to number
        let itemTotal = itemPrice * item.quantity;
        totalSum += itemTotal;

        receiptContent += `
            <tr>
                <td>${item.quantity} ×</td>
                <td>${item.name}</td>
                <td>${itemTotal.toFixed(2)}€</td>
            </tr>
        `;
    });

    receiptContent += `</table></div>`;

    receiptContent += `
        <div class="ReceiptFooter">
            <button class="PayButton">Zaplatiť</button>
            <strong class="PayTotalText">Celkom: ${totalSum.toFixed(2)}€</strong>
        </div>
    `;

    receiptDiv.innerHTML = receiptContent;
    basketContainer.appendChild(receiptDiv);

    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains("PayButton")) {
            createPaymentModal();
        }
    });

    document.querySelectorAll(".Basket_Image").forEach(img => {
        img.addEventListener("click", function() {
            console.error("Products data not loaded. Check your script order.");
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            GoToProductPage(productName, productPrice);
        });
    });
}



function changeQuantity(productName, amount) {
    if (basket[productName]) {
        basket[productName].quantity += amount;
        if (basket[productName].quantity <= 0) {
            delete basket[productName]; // Remove item if quantity is 0
        }
        localStorage.setItem("BasketDiv", JSON.stringify(basket)); // Update storage
        updateBasket();
    }
}

function loadBasket() {
    updateBasket();
}


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("Search_Bar");
    searchInput.addEventListener("keyup", searchProducts);
});

function searchProducts() {
    const query = document.getElementById("Search_Bar").value.toLowerCase();
    const viewer = document.getElementById("Viewer");
    viewer.innerHTML = ""; // Clear previous products

    let results = [];

    // Search across all categories
    Object.keys(products).forEach(category => {
        results.push(
            ...products[category].filter(product =>
                product.name.toLowerCase().includes(query) || 
                (product.description && product.description.toLowerCase().includes(query))
            )
        );
    });

    // Remove duplicates based on product name
    const uniqueResults = [];
    const seenNames = new Set();

    results.forEach(product => {
        if (!seenNames.has(product.name)) {
            seenNames.add(product.name);
            uniqueResults.push(product);
        }
    });

    // Display search results
    if (uniqueResults.length > 0) {
        uniqueResults.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            productDiv.innerHTML = `
            <div class="product-card">
                <p class="product-name">${product.name}</p>
                <img class="Clickable_Image" 
                     src="${product.image}" 
                     alt="${product.name}" 
                     data-name="${product.name}" 
                     data-price="${product.price}" 
                     data-imageurl="${product.image}">
                <p class="product-price">${product.price}€</p>

                <div class="quantity-container">
                    <div class="quantity-controls">
                        <button class="Button" onclick="decreaseQuantity('${product.name}')">−</button>
                        <span class="WhiteText" id="quantity-${product.name}">1</span>
                        <button class="Button" onclick="increaseQuantity('${product.name}')">+</button>
                    </div>
                    <button class="add-to-cart" onclick="addToCart('${product.name}', '${product.price}', '${product.image}')">Add to Cart</button>
                </div>
            </div>
        `;



            viewer.appendChild(productDiv);
        });
        document.querySelectorAll(".Clickable_Image").forEach(img => {
            console.error("a");
            img.addEventListener("click", function() {
                console.error("Products data loaded.");
                const productName = this.dataset.name;
                const productPrice = this.dataset.price;
                GoToProductPage(productName, productPrice);
    
            });
        });
    } else {
        viewer.innerHTML = "<p>No products found.</p>";
    }
    const express = require("express");
    const router = express.Router();
    const AmazonAPI = require("../backend/amazonAPI"); // Ensure correct path
    const AliExpressAPI = require("../backend/aliExpressAPI"); // Ensure correct path
    const Order = require("./models/Order");

// Function to place an order based on user's basket
    async function placeOrder(userId, basket) {
        try {
            const orders = [];
            for (const item of basket) {
                let orderResponse;
                if (item.source === "Amazon") {
                    orderResponse = await AmazonAPI.placeOrder(item);
                } else if (item.source === "AliExpress") {
                    orderResponse = await AliExpressAPI.placeOrder(item);
                } else {
                    throw new Error("Unknown source");
                }

                orders.push({
                    userId,
                    productId: item.id,
                    orderId: orderResponse.orderId,
                    status: "Pending",
                    source: item.source,
                });
            }
            await Order.insertMany(orders);
            return { success: true, message: "Orders placed successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // API endpoint to handle orders
    router.post("/place-order", async (req, res) => {
        const { userId, basket } = req.body;
        if (!userId || !basket || !Array.isArray(basket)) {
            return res.status(400).json({ success: false, message: "Invalid request" });
        }
        const response = await placeOrder(userId, basket);
        res.json(response);
    });

    module.exports = router;



    const stripe = require("stripe")("sk_test_51QvljKCvmsp7wkrwxvXme8U0enldwJeiN5x4sH0xo15x9YPuTjEYygDVYwgf7CRUojPaP0Gl1opKRWkk8CcGWLO600CaUhiEaK");
const nodemailer = require("nodemailer");

async function processOrder(cartItems, userDetails) {
    const totalAmount = calculateTotal(cartItems);
    console.error("processOrder");
    // Create Stripe payment with metadata
    const paymentIntent = await createStripePayment(userDetails, totalAmount, cartItems);
    if (!paymentIntent || paymentIntent.status !== "succeeded") {
        console.error("Payment failed or not confirmed.");
        return;
    }

    // Send confirmation email to the customer
    //await sendConfirmationEmail(userDetails.email, cartItems, totalAmount);

    // Trigger "Thanks for Purchase" function
    thanksForPurchase();

    console.log("Payment successful, order details sent to Stripe and customer.");
}

// Create Stripe PaymentIntent with metadata
async function createStripePayment(userDetails, amount, cartItems) {
    try {
        const orderSummary = cartItems.map(item => `${item.quantity}x ${item.name} (${item.price}€)`).join(", ");
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: "eur",
            metadata: {
                customer_name: `${userDetails.name} ${userDetails.surname}`,
                email: userDetails.email,
                order_summary: orderSummary
            }
        });

        console.log("PaymentIntent created:", paymentIntent.id);
        return paymentIntent;
    } catch (error) {
        console.error("Stripe PaymentIntent Error:", error);
        return null;
    }
}

// Send email confirmation
async function sendConfirmationEmail(userEmail, cartItems, totalAmount) {
    
}

// Calculate total price
function calculateTotal(cartItems) {
    return cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
}

// "Thanks for Purchase" function
function thanksForPurchase() {
    console.log("Thanks for your purchase! Your order is being processed.");
}

module.exports = { processOrder };

}