const itemCard = document.querySelector('#item');
const mainIndex = document.querySelector('#mainIndex');
const tshirts = document.querySelector('#tshirts');
const hoodies = document.querySelector('#hoodies');
const sweatshirts = document.querySelector('#sweatshirts');
const hats = document.querySelector('#hats');
const itemImg = document.querySelector('#itemImg');
const itemName = document.querySelector('#itemName');
const itemCategorie = document.querySelector('#itemCategorie');
const itemColor = document.querySelector('#itemColor');
const sizeS = document.querySelector('#s');
const sizeM = document.querySelector('#m');
const sizeL = document.querySelector('#l');
const sizeXl = document.querySelector('#xl');
const itemDescription = document.querySelector('#itemDescription');
const itemPrice = document.querySelector('#itemPrice');
const outOfStock = document.querySelector('#OutOfStock');
const title = document.querySelector('title');
const likeBtn = document.querySelector('#like');
const liked = document.querySelector('#liked');
const toCart = document.querySelector('#toCart');
const sizeDropDown = document.querySelector('#sizeDropDown');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const sizeForm = document.querySelector('#sizeForm');
const cart = document.querySelector('#cart');
const dropdownCart = document.querySelector('#cartsDp');
const cartDropdownItem = document.querySelector('#cartDropdownItem');
const cartTotal = document.querySelector('#cartTotal');
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
  window.location.href = 'index.html';
})

tshirts1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'tshirt');
  window.location.href = 'categories.html';
})

hoodies1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hoodie');
  window.location.href = 'categories.html';
})

sweatshirts1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'sweatshirt');
  window.location.href = 'categories.html';
})

hats1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hat');
  window.location.href = 'categories.html';
})

liked1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'like');
  window.location.href = 'categories.html';
})

cart1.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = 'cart.html';
})

mobileNav.addEventListener('click', () => {  
    mobileList.style.right= '0px';
    mobileList.style.top= '-20px';
})

closeBtn.addEventListener('click', () => {
  mobileList.style.right='-180px';
  mobileList.style.top='-500px'
})


const id=localStorage.getItem('item_id');

mainIndex.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'all');
  window.location.href = 'index.html';
})

tshirts.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'tshirt');
  window.location.href = 'categories.html';
})

hoodies.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hoodie');
  window.location.href = 'categories.html';
})

sweatshirts.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'sweatshirt');
  window.location.href = 'categories.html';
})

hats.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hat');
  window.location.href = 'categories.html';
})

liked.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'like');
  window.location.href = 'categories.html';
})

cart.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = 'cart.html';
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
  cartDropdownItem.innerHTML='';
  cartCheck(data);
	itemPicker(data);
  filtring(data);
})
}

getData()

const cartCheck = (data) => {
  data.forEach(element => {
    let b = JSON.parse(element.reserve);
    b.forEach((x) => {
      if (x>0){
        cart.style.color= '#F68E5F';
      } 
    })
  })
}

const itemPicker = (data) => {
  data.forEach(element => {
    if (element.id === +id){
      const likedArr = JSON.parse(localStorage.getItem('liked')) || [];
      draw(element, likedArr);
      toReserve(element);
    }
  });
}

const draw = (data, likedArr) => {
  
  const pics = JSON.parse(data.picUrl);
  pics.forEach(element => {
    title.textContent = data.name;
    const itemPic = document.createElement('img');
    itemPic.setAttribute('class', 'ItemImg')
    itemPic.src=element;
    itemImg.appendChild(itemPic)

    if (likedArr.length>0) {
      liked.style.color= 'red'
    } else {
      liked.style.color= 'black'
    }

  })
  let itemId = data.id;
  if (likedArr.includes(+itemId)) {
    likeBtn.setAttribute('class', 'liked fa-solid fa-heart')
  }
  
  itemName.textContent = data.name;
  itemCategorie.textContent = data.type;
  itemColor.textContent = data.color;

  const sizes = JSON.parse(data.size);
  if (sizes[0]== 0) {
    sizeS.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock';
    option1.setAttribute('disabled', '')

  }
  if (sizes[1]== 0) {
    sizeM.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock'
    option2.setAttribute('disabled', '')
  }
  if (sizes[2]== 0) {
    sizeL.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock';
    option3.setAttribute('disabled', '')
  }
  if (sizes[3]== 0) {
    sizeXl.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock';
    option4.setAttribute('disabled', '')
  }

  itemDescription.textContent = data.description;
  itemPrice.textContent = `${data.price}$`;
}

likeBtn.addEventListener('click', (e) =>{
  e.preventDefault()
  let likedArr = JSON.parse(localStorage.getItem('liked')) || [];
  if (likedArr.includes(+id)) {
    let i = likedArr.indexOf(+id);
    likedArr.splice(i,1);
    let jsonLiked = JSON.stringify(likedArr);
    localStorage.setItem('liked', jsonLiked);
    likeBtn.setAttribute('class', 'fa-regular fa-heart')
  } else {
    likeBtn.setAttribute('class', 'liked fa-solid fa-heart')
    likedArr.push(+id);
    let jsonLiked = JSON.stringify(likedArr);
    localStorage.setItem('liked', jsonLiked);
  }
  getData()
})

let pickedSize

sizeDropDown.addEventListener('change', (e) => {
  e.preventDefault();
  sizeDropDown.style.backgroundColor= 'white';
  sizeForm.style.color= 'black';
  pickedSize = +sizeDropDown.value;
  })
   
const toReserve = (data) => {
toCart.addEventListener('click', (e) => {
  e.preventDefault();

  if (pickedSize === 0 || pickedSize > 0) {
    sizeDropDown.value= "undefined";

    let parsedReserve = JSON.parse(data.reserve);
    let parsedSize = JSON.parse(data.size);
    parsedSize[pickedSize]-=1;
    parsedReserve[pickedSize]+=1;

    editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
    
  } else {
    sizeDropDown.style.backgroundColor= 'red';
    sizeForm.style.color= 'red';
  }
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
		itemImg.innerHTML='';
		getData()
	})
}


const filtring = (data) => {
  let totalPrice = [];
  data.forEach(element => {
    let b = JSON.parse(element.reserve)
    b.forEach((x, index) => {
      
      if (x>0){
        cartDraw(element, index, x ,totalPrice);
        cartPeaklook();
      } else {
      }
    })
  })
}

const cartDraw = (product, index, x, totalPrice) => {
  const pic = JSON.parse(product.picUrl);
  
  const img = document.createElement('img');
  img.src=pic[0];

  const name = document.createElement('h3');
  name.textContent=product.name;

  const numberOfItems = document.createElement('span');

  const productSize = document.createElement('span');
  numberOfItems.textContent= ` pcs. ${x}`;
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
  price.textContent= `${x*product.price}$`;

  let multipPrice = x*product.price;
  totalPrice.push(multipPrice);

  const li = document.createElement('li')
  li.appendChild(img);
  li.appendChild(name);
  li.appendChild(productSize);
  li.appendChild(numberOfItems);
  li.appendChild(price);

  cartDropdownItem.appendChild(li);

  sum = totalPrice.reduce((a, b) => a + b, 0);
  cartTotal.textContent= `Total ${sum}$`;
}

const cartPeaklook = () => {
  cart.addEventListener('mouseover', () => {
    dropdownCart.style.display = 'block';
  })
  
  cart.addEventListener('mouseout', () => {
      dropdownCart.style.display = 'none';
  })
}
