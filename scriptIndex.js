const filterColor = document.querySelector('#filterColor');
const filterSearch = document.querySelector('#filterSearch');
const products = document.querySelector('#products');


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
	draw(data)
  search(data)
  colorSearch(data)
	console.log('GOT this data to draw :', data)
})
}

getData()

const draw = (data) => {
  data.forEach(element => {
    const div = document.createElement('div');
    div.setAttribute('class', 'product');

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

    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(price);
   
    products.appendChild(div);
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