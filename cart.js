fetch('/data/products.json')
  .then(res => res.json())
  .then(products => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const container = document.getElementById('cart-container');
    let total = 0;

    Object.entries(cart).forEach(([id, qty]) => {
      const product = products.find(p => p.id === id);
      const itemTotal = product.price * qty;
      total += itemTotal;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)} x ${qty} = $${itemTotal.toFixed(2)}</p>
        <button onclick="updateCart('${id}', ${qty - 1})">-</button>
        <button onclick="updateCart('${id}', ${qty + 1})">+</button>
      `;
      container.appendChild(div);
    });

    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
  });

function updateCart(id, qty) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  if (qty <= 0) {
    delete cart[id];
  } else {
    cart[id] = qty;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

function checkout() {
  // Redirect to Stripe checkout function
  fetch('/.netlify/functions/checkout', {
    method: 'POST',
    body: localStorage.getItem('cart')
  })
  .then(res => res.json())
  .then(data => {
    if (data.url) window.location.href = data.url;
    else alert('Checkout failed.');
  });
}
