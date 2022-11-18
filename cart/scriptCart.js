const cartInfo = document.querySelector('#cartInfo');
const topTitle = document.querySelector('#topTitle');
const mainIndex = document.querySelector('#mainIndex');
const tshirts = document.querySelector('#tshirts');
const hoodies = document.querySelector('#hoodies');
const sweatshirts = document.querySelector('#sweatshirts');
const hats = document.querySelector('#hats');
const liked = document.querySelector('#liked');
const cart = document.querySelector('#cart');
const cartTotal = document.querySelector('#cartTotal');
const buy = document.querySelector('#buy');
const deleteAll = document.querySelector('#deleteAll');

mainIndex.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'all');
  window.location.href = '../index.html';
})

tshirts.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'tshirt');
  window.location.href = '/categories/categories.html';
})

hoodies.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hoodie');
  window.location.href = '/categories/categories.html';
})

sweatshirts.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'sweatshirt');
  window.location.href = '/categories/categories.html';
})

hats.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hat');
  window.location.href = '/categories/categories.html';
})

liked.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'like');
  window.location.href = '/categories/categories.html';
})

const getData = () => {
  fetch('https://testapi.io/api/lukasnvc/resource/NewEshop',
{
  method: 'GET',
  headers: {
    'Content-Type':
    'application/json'
  }
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
	return result.data
})
.then((data) => {
  cartInfo.innerHTML='';
  filtring(data);
  cartCheck(data);
})
}

getData()

const id=localStorage.getItem('item_id');



const filtring = (data) => {
  const likedArr = JSON.parse(localStorage.getItem('liked')) || [];
  let totalPrice = [];
  if (totalPrice.length<1) {
    cartTotal.innerHTML = 'No items in cart';
    buy.style.display= 'none';
    deleteAll.style.display= 'none';
  } 
  data.forEach(element => {
    let b = JSON.parse(element.reserve)
    b.forEach((x, index) => {
      
      if (x>0){
        draw(element, index, x ,totalPrice);
      } else {
      }
    })
  })
  if (likedArr.length>0) {
    liked.style.color= 'red'
  } else {
    liked.style.color= 'black'
  }
}


const cartCheck = (data) => {
  data.forEach(element => {
    let b = JSON.parse(element.reserve)
    b.forEach((x) => {
      if (x>0){
        cart.style.color= '#F68E5F';
      } 
    })
  })
}



const draw = (product, index, x, totalPrice) => {

  const pic = JSON.parse(product.picUrl);
  
  const img = document.createElement('img');
  img.src=pic[0];

  const name = document.createElement('h3');
  name.textContent=product.name;

  const numberOfItems = document.createElement('span');

  const productSize = document.createElement('span');
  numberOfItems.textContent= `Pieces : ${x}`;
  if (index == 0){
    productSize.textContent= 'Size : S'
   
  } else if (index == 1) {
    productSize.textContent= 'Size : M';
  } else if (index == 2) {
    productSize.textContent= 'Size : L';
  } else if (index == 3) {
    productSize.textContent= 'Size : XL';
  }
 
  const price = document.createElement('span');
  price.textContent= `Price total : ${x*product.price}$`;

  let multipPrice = x*product.price;
  totalPrice.push(multipPrice);
  totalPrice.forEach((item,y) => {
    let priceIndex = totalPrice.indexOf(item,y);
    
  })

  const addBtn = document.createElement('button');
  addBtn.setAttribute('class', 'addBtn');
  addBtn.textContent= 'Add Item';

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'deleteBtn');
  deleteBtn.textContent= 'Remove Item';

  const div3 = document.createElement('div');
  div3.setAttribute('class', 'buttons');
  div3.appendChild(addBtn);
  div3.appendChild(deleteBtn);

  const div2 = document.createElement('div')
  div2.setAttribute('class', 'productDetails');
  div2.appendChild(name);
  div2.appendChild(productSize);
  div2.appendChild(numberOfItems);
  div2.appendChild(price);
  div2.appendChild(div3);

  const div1 = document.createElement('div')
  div1.setAttribute('class', 'productCard');
  div1.appendChild(img);
  div1.appendChild(div2);

  cartInfo.appendChild(div1)

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(product, index);
  })

  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeFromCart(product, index);
  })
  sum = totalPrice.reduce((a, b) => a + b, 0);
  cartTotal.textContent= `Total ${sum}$`;
  buy.style.display = 'block';
  deleteAll.style.display = 'block';
  buyDeleteReserve(product, index);
  deleteAllItems(product, index , x);
}


const priceTotalF = (priceIndex, multipPrice) => {
  totalPrice[priceIndex]=multipPrice;
}


const addToCart = (data, index) => {
  
  let parsedReserve = JSON.parse(data.reserve);
  let parsedSize = JSON.parse(data.size);
  parsedSize[index]-=1;
  parsedReserve[index]+=1;

  editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
}

const removeFromCart = (data, index) => {
  let parsedReserve = JSON.parse(data.reserve);
  let parsedSize = JSON.parse(data.size);
  parsedSize[index]+=1;
  parsedReserve[index]-=1;

  editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
}

const buyDeleteReserve = (data, index) => {
  buy.addEventListener('click', (e) => {
    e.preventDefault();
    let parsedSize = JSON.parse(data.size);
    let parsedReserve = JSON.parse(data.reserve);
    parsedReserve[index] = 0;
    
    editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
    getData()
  })
}

const deleteAllItems = (data, index, x) => {
  deleteAll.addEventListener('click', (e) => {
    e.preventDefault();
    let parsedSize = JSON.parse(data.size);
    let parsedReserve = JSON.parse(data.reserve);
    parsedSize[index] +=x;
    parsedReserve[index] = 0;
    editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
    getData()
  })
}

const editProduct = (id, color, name, sizes, reserve, description, price, picUrl, type) => {
  fetch(`https://testapi.io/api/lukasnvc/resource/NewEshop/${id}`,
  {
    method: 'PUT',
    headers: {
      'Content-Type':
      'application/json'
    },
    body: JSON.stringify({
      color: `${color}`,
      name: `${name}`,
      size: JSON.stringify(sizes),
      reserve: JSON.stringify(reserve),
      description: `${description}`,
      price: `${price}`,
      picUrl: `${picUrl}`,
      type:  `${type}`
    }) 
  })
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((result) => {
    console.log(result)
    cartInfo.innerHTML='';
    cart.style.color= 'black';
    getData()
  })
}


// if (!window.location.href = '../index.html'){
//   window.onunload = function(){
    
//     alert("The window is closing now!");
//   }
//   }