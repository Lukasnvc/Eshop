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

const id=localStorage.getItem('item_id');

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

cart.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = '/cart/cart.html';
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
  cartCheck(data);
	itemPicker(data);
})
}

getData()

const cartCheck = (data) => {
  data.forEach(element => {
    let b = JSON.parse(element.reserve)
    console.log(b)
    b.forEach((x) => {
      if (x>0){
        cart.style.color= '#F68E5F';
      } 
    })
  })
}

const itemPicker = (data) => {
  console.log(id)
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
  
  console.log(data.size, data.reserve);

  if (pickedSize === 0 || pickedSize > 0) {
    sizeDropDown.value= "undefined";

    let parsedReserve = JSON.parse(data.reserve);
    let parsedSize = JSON.parse(data.size);
    parsedSize[pickedSize]-=1;
    parsedReserve[pickedSize]+=1;
    console.log(parsedReserve, parsedSize)

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
		console.log('Fetching data : ', result);
		
		getData()
	})
}
