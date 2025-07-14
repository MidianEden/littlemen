fetch('/data/products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.querySelector('.gallery-grid');
    container.innerHTML = ''; // Clear old static content
    products.forEach(product => {
      const item = document.createElement('div');
      item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius: 15px; border: 4px solid #fff; box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);">
        <h3 style="color:#fff;">${product.name}</h3>
        <p style="color:#ffca3a;">$${product.price.toFixed(2)}</p>
        <button onclick="addToCart('${product.id}')" style="margin-top:10px;padding:0.5rem 1rem;border:none;border-radius:10px;background:#fff;color:#000;cursor:pointer;">Add to Cart</button>
      `;
      item.style.textAlign = 'center';
      container.appendChild(item);
    });
  });

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[id] = (cart[id] || 0) + 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Added to cart!");
}
