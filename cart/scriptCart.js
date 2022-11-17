const cartInfo = document.querySelector('#cartInfo');

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
	filterCart(data);
})
}

getData()

const id=localStorage.getItem('item_id');


const filterCart = (data) => {
data.forEach(product => {
  if (product.id===+id){
    console.log(product)
    draw(product)
  }
})
  

      
    
    

  

}


const draw = (product) => {
  const pic = JSON.parse(product.picUrl);
  
  const img = document.createElement('img');
  img.src=pic[0];

  const name = document.createElement('h3');
  name.textContent=product.name;

  const numberOfItems = document.createElement('span');

  const productSize = document.createElement('span')
  let parsedReserve = JSON.parse(product.reserve)
  let index 
  if (parsedReserve[0] > 0){
    productSize.textContent= 'Size : S'
    numberOfItems.textContent= parsedReserve[0];
    index=0
  } else if (parsedReserve[1] > 0) {
    productSize.textContent= 'Size : M'
    numberOfItems.textContent= parsedReserve[1];
    index=1
  } else if (parsedReserve[2] > 0) {
    productSize.textContent= 'Size : L'
    index=2
    numberOfItems.textContent= parsedReserve[2];
  } else if (parsedReserve[3] > 0) {
    productSize.textContent= 'Size : XL'
    index=3
    numberOfItems.textContent= parsedReserve[3];
  }
 
  const price = document.createElement('span');
  price.textContent= `Price : ${product.price}`;

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
  div2.appendChild(price);
  div2.appendChild(numberOfItems);
  div2.appendChild(div3);

  const div1 = document.createElement('div')
  div1.setAttribute('class', 'productCard');
  div1.appendChild(img);
  div1.appendChild(div2);

  cartInfo.appendChild(div1)

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(product, index)
  })

  
console.log(index)


  
}





const addToCart = (data, index) => {
 
      let parsedReserve = JSON.parse(data.reserve);
      let parsedSize = JSON.parse(data.size);
      parsedSize[index]-=1;
      parsedReserve[index]+=1;
      console.log(parsedReserve, parsedSize)
  
      editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
  

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
      cartInfo.innerHTML='';
      getData()
    })
  }
