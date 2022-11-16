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

const getData = () => {
  fetch('https://testapi.io/api/lukasnvc/resource/Eshop',
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
	itemPicker(data);
})
}
getData()

let likedArr = JSON.parse(localStorage.getItem('liked')) || [];

const itemPicker = (data) => {
  console.log(id)
  data.forEach(element => {
    if (element.id == id){
      draw(element)
    }
  });
}


const draw = (data) => {
  const pics = JSON.parse(data.picUrl);
  pics.forEach(element => {
    title.textContent = data.name;
    const itemPic = document.createElement('img');
    itemPic.setAttribute('class', 'ItemImg')
    itemPic.src=element;
    itemImg.appendChild(itemPic)

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
    outOfStock.textContent = 'Red sizes out of stock'
  }
  if (sizes[1]== 0) {
    sizeM.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock'
  }
  if (sizes[2]== 0) {
    sizeL.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock'
  }
  if (sizes[3]== 0) {
    sizeXl.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock'
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
})

