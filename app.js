let isAdmin = false;
let products = [];

function login() {
  const username = prompt("Enter admin username:");
  const password = prompt("Enter admin password:");
  if (username === "admin" && password === "password123") {
    isAdmin = true;
    document.getElementById("admin-panel").style.display = "block";
  } else {
    alert("Invalid credentials");
  }
}

async function fetchProducts() {
  const res = await fetch("https://your-backend-url.onrender.com/api/products ");
  products = await res.json();
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>₹${product.price}</p>
      </div>
    `;
  });
}

async function addProduct() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = parseFloat(document.getElementById("price").value);
  const file = document.getElementById("image").files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    const newProduct = { name, description, price, image: reader.result };
    await fetch("https://your-backend-url.onrender.com/api/products ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa("admin:password123")
      },
      body: JSON.stringify(newProduct)
    });
    fetchProducts();
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
  };

  if (file) reader.readAsDataURL(file);
}

fetchProducts();
