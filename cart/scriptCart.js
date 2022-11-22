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
const totalPcsH2 = document.querySelector('#totalPcs');
const mobileNav = document.querySelector('#mobileNav');
const mobileList = document.querySelector('#mobileList');
const closeBtn = document.querySelector('#closeBtn');

const mainIndex1 = document.querySelector('#mainIndex1');
const tshirts1 = document.querySelector('#tshirts1');
const hoodies1 = document.querySelector('#hoodies1');
const sweatshirts1 = document.querySelector('#sweatshirts1');
const hats1 = document.querySelector('#hats1');
const liked1 = document.querySelector('#liked1');
const cart1 = document.querySelector('#cart1');

mainIndex1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'all');
  window.location.href = '../index.html';
})

tshirts1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'tshirt');
  window.location.href = '/categories/categories.html';
})

hoodies1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hoodie');
  window.location.href = '/categories/categories.html';
})

sweatshirts1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'sweatshirt');
  window.location.href = '/categories/categories.html';
})

hats1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hat');
  window.location.href = '/categories/categories.html';
})

liked1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'like');
  window.location.href = '/categories/categories.html';
})

mobileNav.addEventListener('click', () => {  
    mobileList.style.right= '0px';
    mobileList.style.top= '-20px';
})

closeBtn.addEventListener('click', () => {
  mobileList.style.right='-180px';
  mobileList.style.top='-500px'
})


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
  let totalPcs = [];
  if (totalPrice.length<1) {
    cartTotal.innerHTML = 'No items in cart';
    buy.style.display= 'none';
    deleteAll.style.display= 'none';
  } 
  data.forEach(element => {
    let b = JSON.parse(element.reserve)
    b.forEach((x, index) => {
      
      if (x>0){
        
        draw(element, index, x ,totalPrice, totalPcs);
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



const draw = (product, index, x, totalPrice, totalPcs) => {

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

  totalPcs.push(x)
  const price = document.createElement('span');
  price.textContent= `Price total : ${x*product.price}$`;

  let multipPrice = x*product.price;
  totalPrice.push(multipPrice);


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
  sumPcs= totalPcs.reduce((a,b) => a + b, 0);
  totalPcsH2.textContent= `${sumPcs} pcs.`
  buy.style.display = 'block';
  deleteAll.style.display = 'block';
  buyDeleteReserve(product, index);
  deleteAllItems(product, index , x);
}

const addToCart = (data, index) => {
  
  let parsedReserve = JSON.parse(data.reserve);
  let parsedSize = JSON.parse(data.size);
  if (parsedSize[index]>0){
    parsedSize[index]-=1;
  parsedReserve[index]+=1;

  editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
  }
}

const removeFromCart = (data, index) => {
  let parsedReserve = JSON.parse(data.reserve);
  let parsedSize = JSON.parse(data.size);
  if (parsedReserve[index]>0) {
    parsedSize[index]+=1;
    parsedReserve[index]-=1;
  
    editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
  }
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


let index = 0;
setInterval (function(){
  const imageSources = ['https://scontent.fkun1-1.fna.fbcdn.net/v/t39.30808-6/296855164_7724467134290675_2296242593078657806_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=wNItxyCbS-kAX-BgkTO&_nc_ht=scontent.fkun1-1.fna&oh=00_AfDZuvbL6d_JLoAvrOKML96CbPPfq-39dQ71QKpIyHWtHA&oe=637EDB71', 'https://scontent.fkun1-1.fna.fbcdn.net/v/t39.30808-6/296166411_7708941002509955_747590807790550950_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Rpar9oUtmJEAX8wUA8g&_nc_ht=scontent.fkun1-1.fna&oh=00_AfDmtPMHXrdzGOalfS9mSBZ9FmBDeML86vE7uxc3d78NyQ&oe=637F6D17', 'https://scontent.fkun1-1.fna.fbcdn.net/v/t39.30808-6/294758048_7673400079397381_400374745871900328_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=r6HOYhu7eJ8AX-Xnhts&_nc_ht=scontent.fkun1-1.fna&oh=00_AfBSDgSzAeiB1Sr5mVvYNTJ8aRRUUyd07yzGpx1d3nXnVw&oe=637F2A95', 'https://scontent.fkun1-1.fna.fbcdn.net/v/t39.30808-6/297077252_7767089143361807_1013267406943045715_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=y7XJ8VJAwbgAX8JIqL4&_nc_ht=scontent.fkun1-1.fna&oh=00_AfAtyeSdYPdwhzi2XSnz2-lATXyb3taCwI4aNAgpgmY93w&oe=637E5AD1','https://scontent.fkun1-1.fna.fbcdn.net/v/t39.30808-6/281628033_7414052225332169_2452725281815647411_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ZZFTGk8xUBIAX9-0C7i&_nc_ht=scontent.fkun1-1.fna&oh=00_AfAmv85TjEvZH0_JfHbuH4zKjX618wazBW1hd9o5wJddIw&oe=637F4BBE'];
  if (index === imageSources.length) {
    index = 0;
  }
  document.getElementById('slide').src = imageSources[index];
  index++;
} , 2500);


// if (!window.location.href = '../index.html'){
//   window.onunload = function(){
    
//     alert("The window is closing now!");
//   }
//   }