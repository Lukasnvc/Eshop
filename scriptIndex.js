const filterColor = document.querySelector('#filterColor');
const filterSearch = document.querySelector('#filterSearch');
const products = document.querySelector('#products');
const mainIndex = document.querySelector('#mainIndex');
const tshirts = document.querySelector('#tshirts');
const hoodies = document.querySelector('#hoodies');
const sweatshirts = document.querySelector('#sweatshirts');
const hats = document.querySelector('#hats');
const admin = document.querySelector('#admin');
const liked =document.querySelector('#liked');
const cart = document.querySelector('#cart');





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
  products.innerHTML='';
	draw(data)
  search(data)
  colorSearch(data)
	console.log('GOT this data to draw :', data)
})
}

getData()

let likedArr = JSON.parse(localStorage.getItem('liked')) || [];

const draw = (data) => {
  const itemSizeArr = JSON.parse(localStorage.getItem('itemId&size')) || [];
  if (itemSizeArr.length>0){
  cart.style.color= '#F68E5F';
  } 
  data.forEach(element => {
    const div = document.createElement('div');
    div.setAttribute('class', 'product');

    const likedBtn = document.createElement('i');
    likedBtn.setAttribute('class', 'fa-regular fa-heart');
    if (likedArr.includes(element.id)) {
      console.log('liked', element)
      likedBtn.setAttribute('class', 'liked fa-solid fa-heart')
    }

    if (likedArr.length>0) {
      liked.style.color= 'red'
    } else {
      liked.style.color= 'black'
    }

    const pic = JSON.parse(element.picUrl);
    const img = document.createElement('img');
    img.setAttribute('class', 'productImg');
    img.src= pic[0]

    const name = document.createElement('h3');
    name.setAttribute('class', 'productName');
    name.textContent= element.name;

    const price = document.createElement('h4');
    price.setAttribute('class', 'productPrice');
    price.textContent= `${element.price}$`

    div.appendChild(likedBtn);
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(price);
   
    products.appendChild(div);

    img.addEventListener('click', (e) => {
      e.preventDefault();
      pushUser(element);
      window.location.href = '/item/item.html';
    })

    likedBtn.addEventListener('click', (e) => {
      e.preventDefault()
      
      if (likedArr.includes(element.id)) {
        let i = likedArr.indexOf(element.id);
        likedArr.splice(i,1);
        let jsonLiked = JSON.stringify(likedArr);
        localStorage.setItem('liked', jsonLiked);
      } else {
        likedArr.push(element.id);
        let jsonLiked = JSON.stringify(likedArr);
        localStorage.setItem('liked', jsonLiked);
      }
      getData()
    })
  });
}

const search = (data) => {
filterSearch.addEventListener('keyup', (e) => {
const b = e.target.value.toLowerCase();
const filteredProducts = data.filter((products) => {
  return (
    products.name.toLowerCase().includes(b)
  );
})
if (b){
  products.innerHTML=null;
  draw(filteredProducts);
  } else {
  products.innerHTML=null;
  getData()
  }
})
}

const colorSearch = (data) => {
  filterColor.addEventListener('change', (e) => {
    e.preventDefault();
    console.log(filterColor.value);
    const value = filterColor.value;
    const filteredColor = data.filter((products) => {
      return (
        products.color.includes(value)
      );
    })
    if (value) {
      products.innerHTML=null;
      draw(filteredColor);
    } else {
      products.innerHTML=null;
      getData()
    }
  })
}

const pushUser = (item) => {
  let id =item.id;
  localStorage.setItem('item_id', id);
}

mainIndex.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'all');
  window.location.href = '/index.html';
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

admin.addEventListener('click', () => {
  localStorage.clear();
  localStorage.setItem('categorie', 'like');
  window.location.href = '/admin/admin.html';
})

cart.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = '/cart/cart.html';
})

