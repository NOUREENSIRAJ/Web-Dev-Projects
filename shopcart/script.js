const products=[
  {id:1,name:'Wireless Noise-Cancelling Headphones',cat:'Electronics',price:89,old:129,emoji:'🎧',bg:'#EFF6FF',badge:'Sale'},
  {id:2,name:'Mechanical Keyboard RGB',cat:'Electronics',price:65,old:null,emoji:'⌨️',bg:'#F0FDF4',badge:'New'},
  {id:3,name:'Minimalist Leather Wallet',cat:'Accessories',price:28,old:45,emoji:'👜',bg:'#FFF7ED',badge:'Sale'},
  {id:4,name:'Portable Phone Stand',cat:'Accessories',price:15,old:null,emoji:'📱',bg:'#FDF4FF',badge:null},
  {id:5,name:'Smart Water Bottle 750ml',cat:'Lifestyle',price:34,old:null,emoji:'🧴',bg:'#ECFDF5',badge:'New'},
  {id:6,name:'USB-C Hub 7-in-1',cat:'Electronics',price:42,old:60,emoji:'🔌',bg:'#EFF6FF',badge:'Sale'},
  {id:7,name:'Canvas Backpack 25L',cat:'Bags',price:55,old:null,emoji:'🎒',bg:'#FFFBEB',badge:null},
  {id:8,name:'Desk Plant — Succulent Set',cat:'Lifestyle',price:22,old:null,emoji:'🌵',bg:'#F0FDF4',badge:'New'},
];

const cats=['All','Electronics','Accessories','Lifestyle','Bags'];
let activecat='All';
let cart=[];

function renderCats(){
  const bar=document.getElementById('categoryBar');
  bar.innerHTML=cats.map(c=>`<button class="cat-btn ${c===activecat?'active':''}" onclick="setcat('${c}')">${c}</button>`).join('');
}

function setcat(c){activecat=c;renderCats();renderProducts();}

function renderProducts(){
  const list=activecat==='All'?products:products.filter(p=>p.cat===activecat);
  document.getElementById('sectionTitle').textContent=activecat==='All'?'All Products':activecat;
  document.getElementById('productsGrid').innerHTML=list.map(p=>`
    <div class="product-card">
      <div class="product-img" style="background:${p.bg}">
        ${p.badge?`<span class="badge ${p.badge==='Sale'?'badge-sale':'badge-new'}">${p.badge}</span>`:''}
        ${p.emoji}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-cat">${p.cat}</div>
        <div class="product-price-row">
          <span class="price">$${p.price}</span>
          ${p.old?`<span class="old-price">$${p.old}</span>`:''}
        </div>
        <div class="stars">★★★★${p.id%3===0?'☆':'★'} (${20+p.id*7})</div>
        <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>`).join('');
}

function addToCart(id){
  const p=products.find(x=>x.id===id);
  const existing=cart.find(x=>x.id===id);
  if(existing)existing.qty++;
  else cart.push({...p,qty:1});
  updateCartCount();
  showToast(`✓ ${p.name.split(' ').slice(0,3).join(' ')} added!`);
  renderCartItems();
}

function updateCartCount(){document.getElementById('cartCount').textContent=cart.reduce((a,b)=>a+b.qty,0);}

function renderCartItems(){
  const el=document.getElementById('cartItems');
  const footer=document.getElementById('cartFooter');
  if(cart.length===0){
    el.innerHTML='<div class="empty-cart"><div style="font-size:48px;margin-bottom:1rem">🛒</div><p>Your cart is empty</p></div>';
    footer.innerHTML='';return;
  }
  el.innerHTML=cart.map(item=>`
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div style="flex:1">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
          <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    </div>`).join('');
  const total=cart.reduce((a,b)=>a+(b.price*b.qty),0);
  footer.innerHTML=`
    <div class="cart-total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    <button class="checkout-btn" onclick="checkout()">Proceed to Checkout →</button>`;
}

function changeQty(id,delta){
  const item=cart.find(x=>x.id===id);
  item.qty+=delta;
  if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
  updateCartCount();renderCartItems();
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);updateCartCount();renderCartItems();}
function toggleCart(){document.getElementById('cartPanel').classList.toggle('open');document.getElementById('overlay').classList.toggle('open');renderCartItems();}
function closeCart(){document.getElementById('cartPanel').classList.remove('open');document.getElementById('overlay').classList.remove('open');}
function checkout(){showToast('✅ Order placed! Thank you for shopping.');cart=[];updateCartCount();renderCartItems();closeCart();}

function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2800);
}

renderCats();renderProducts();