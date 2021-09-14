// Fetch All Data From API.JSON File
const loadProducts = () => {
  const url = `./api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// Show All Products in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product bg-white shadow-lg m-3">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title.slice(0, 26)}</h4><hr>
      <p>Category: ${product.category}</p>
      <p>Rating:  ${product.rating.rate}</p>
      <p>Total Reviews:  ${product.rating.count}</p><hr>
      <h4>Price: $ ${product.price}</h4>
      <button onclick="addToCart(${product.id},${
      product.price
    })" id="addToCart-btn" class="buy-now btn btn-success">Add To Cart</button>
      <button id="details-btn" class="btn btn-outline-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Add To Cart With updateTotal() Function call
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// Get Input Value Function 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// Main Price Update Function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = parseFloat(convertedOldPrice + convertPrice);
  document.getElementById(id).innerText = total.toFixed(2);
};

// Set innerText Function With Two Decimal 
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// Update Delivery Charge & Total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//GrandTotal Update Function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText =
    parseFloat(grandTotal).toFixed(2);
};

// loadProducts() Function Call
loadProducts();